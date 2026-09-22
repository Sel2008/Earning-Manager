import fs from 'node:fs/promises';

const FEED_PATH='data/opportunities.json';
const MAX_VERIFY=40;
const USER_AGENT='Earning-Manager-Research/1.1';
const SOURCES=[
  {name:'Remote OK',url:'https://remoteok.com/remote-jobs.rss'},
  {name:'Remotive',url:'https://remotive.com/remote-jobs/feed'},
  {name:'We Work Remotely',url:'https://weworkremotely.com/remote-jobs.rss'}
];

function strip(s){return s.replace(/<[^>]+>/g,' ').replace(/<!\[CDATA\[|\]\]>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();}
function tag(block,name){const m=block.match(new RegExp('<'+name+'[^>]*>([\\s\\S]*?)</'+name+'>','i'));return m?strip(m[1]):'';}
function classifyEvidence(text){
  const t=text.toLowerCase();
  const prohibited=/(bot|script|automated|automation).{0,100}(prohibit|not allowed|ban|suspend|terminate)/i.test(t);
  const payout=/(pay|paid|reward|earn|compensation|salary|rate)/i.test(t);
  const human=/(human|manual|judgment|review|interview|test|experience)/i.test(t);
  const api=/(api|webhook|integration|automation)/i.test(t);
  return {prohibited_automation:prohibited,payout_language:payout,human_work_signal:human,automation_signal:api};
}
async function verifyOpportunity(o){
  if(!o.source_url) return {...o,verification:{status:'NO_SOURCE'}};
  try{
    const res=await fetch(o.source_url,{headers:{'user-agent':USER_AGENT},redirect:'follow'});
    const text=(await res.text()).slice(0,200000);
    const evidence=classifyEvidence(text);
    let automation='UNKNOWN';
    if(evidence.prohibited_automation) automation='PROHIBITED';
    else if(evidence.automation_signal) automation='POSSIBLE_BUT_REQUIRES_REVIEW';
    const payout=evidence.payout_language;
    const confidence=evidence.prohibited_automation||payout?'MEDIUM':'LOW';
    return {
      ...o,
      source_checked:true,
      last_verified_at:new Date().toISOString(),
      automation_level:o.automation_level==='UNKNOWN'?'UNKNOWN':o.automation_level,
      automation_permitted:automation==='PROHIBITED'?false:null,
      payout_language_found:payout,
      verification:{
        status:'SOURCE_INSPECTED',
        http_status:res.status,
        automation_signal:automation,
        evidence
      },
      research_confidence:confidence,
      reason:o.reason+' Source page was inspected by the research worker; this is evidence collection, not proof of eligibility or payout.'
    };
  }catch(e){
    return {...o,last_verified_at:new Date().toISOString(),verification:{status:'FETCH_FAILED',error:String(e).slice(0,160)}};
  }
}

function parseItems(xml){
  return [...xml.matchAll(/<(?:item|entry)[^>]*>([\\s\\S]*?)<\\/(?:item|entry)>/gi)].map(m=>m[1]).map(b=>({
    title:tag(b,'title'),
    description:tag(b,'description')||tag(b,'summary'),
    link:(b.match(/<link[^>]*href=["']([^"']+)["']/i)||[])[1]||tag(b,'link')
  })).filter(x=>x.title&&x.link);
}

const feed=JSON.parse(await fs.readFile(FEED_PATH,'utf8'));
const existing=new Set((feed.opportunities||[]).map(o=>o.name+'|'+(o.source_url||'')));
const discovered=[];
for(const source of SOURCES){
  try{
    const res=await fetch(source.url,{headers:{'user-agent':'Earning-Manager-Research/1.0'}});
    if(!res.ok) continue;
    const xml=await res.text();
    for(const item of parseItems(xml).slice(0,30)){
      const name=item.title.slice(0,140);
      if(existing.has(name+'|'+item.link)) continue;
      discovered.push({
        name,
        task:item.description.slice(0,500)||'Remote online work opportunity; details require source verification.',
        time:'Source-dependent',
        pay:'Source-dependent',
        hour:'Needs verification',
        status:'UNVERIFIED',
        type:'user',
        withdraw:'Needs verification',
        reason:'Discovered by the scheduled research worker. Eligibility, compensation, automation permission and payout must be verified before recommendation.',
        source_checked:true,
        source_url:item.link,
        research_source:source.name,
        integration_status:'RESEARCH_REQUIRED',
        automation_level:'UNKNOWN',
        automation_permitted:null,
        user_minutes_per_task:30,
        expected_hourly_rate:null,
        machine_verifiable_completion:false,
        payout_confirmed:false,
        upfront_cost:0,
        research_confidence:'LOW',
        priority_class:'HUMAN_REVIEW',
        discovered_at:new Date().toISOString()
      });
    }
  }catch(e){}
}
const candidates=[...(feed.opportunities||[])].filter(o=>o.status==='UNVERIFIED' && o.source_url).slice(0,MAX_VERIFY);
const verified=[];
for(const opportunity of candidates) verified.push(await verifyOpportunity(opportunity));
const verifiedByKey=new Map(verified.map(o=>[o.name+'|'+(o.source_url||''),o]));
feed.opportunities=(feed.opportunities||[]).map(o=>verifiedByKey.get(o.name+'|'+(o.source_url||''))||o);
feed.generated_at=new Date().toISOString();
feed.last_continuous_research={ran_at:feed.generated_at,source_count:SOURCES.length,discovered_count:discovered.length,verified_count:verified.length};
feed.opportunities=[...(feed.opportunities||[]),...discovered].slice(-200);
await fs.writeFile(FEED_PATH,JSON.stringify(feed,null,2)+'\n');
console.log(JSON.stringify(feed.last_continuous_research));
