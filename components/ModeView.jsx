'use client';
import { useState } from 'react';
export default function ModeView({title,data}){
  const [showAdvanced,setShowAdvanced]=useState(false);
  return (<div><h1>{title}</h1><button onClick={()=>setShowAdvanced(!showAdvanced)}>⚙️ {showAdvanced?'Hide':'Show'} Advanced</button><div>{data.map((e,i)=>(<div key={i}>{e.target||'Target'} - {e.counter?.join(', ')}</div>))}</div></div>);
}