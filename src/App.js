/* eslint-disable */
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  uid, mkTask, mkRow, buildProjects,
  PERSON_LIST, PRIORITIES, STATUSES, STAGES, SECTION_META,
} from './data';
import { supabase } from './supabase';

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  navy:    '#0A0F2E',   // deepest navy
  navy2:   '#111638',   // card backgrounds
  navy3:   '#1A2050',   // borders, subtle fills
  navy4:   '#242B5E',   // hover states
  gold:    '#C9A84C',   // primary accent
  goldLt:  '#F5E9C8',   // light gold tint
  goldDim: '#7A6430',   // muted gold text
  slate:   '#6B7599',   // secondary text
  slateL:  '#A8B0CC',   // tertiary text
  white:   '#FFFFFF',
  offWhite:'#F0F2F8',
  bg:      '#F4F5F9',   // page background (light mode for content)
  red:     '#E05252',
  green:   '#2DB87A',
  blue:    '#4A8FE8',
  blueLt:  '#E8F0FD',
};

const PRI_ORDER = { High: 0, Medium: 1, Low: 2 };

const LOGO_URI = "data:image/png;base64,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";

const priCfgNew = {
  High:   { bg: '#FEE8E8', text: '#B91C1C', dot: '#EF4444', dark: { bg: 'rgba(239,68,68,0.15)', text: '#FCA5A5' } },
  Medium: { bg: '#FEF5DC', text: '#92400E', dot: '#F59E0B', dark: { bg: 'rgba(245,158,11,0.15)', text: '#FCD34D' } },
  Low:    { bg: '#E6FAF3', text: '#065F46', dot: '#10B981', dark: { bg: 'rgba(16,185,129,0.15)', text: '#6EE7B7' } },
};
const stsCfgNew = {
  'Not Started':       { bg: '#F3F4F6', text: '#6B7280' },
  'In Progress':       { bg: '#DBEAFE', text: '#1E40AF' },
  'Awaiting Response': { bg: '#FEF5DC', text: '#92400E' },
  'Completed':         { bg: '#D1FAE5', text: '#065F46' },
  'On Hold':           { bg: '#F3E8FF', text: '#6B21A8' },
};

// Google Fonts injected once
if (!document.getElementById('salt-fonts')) {
  const link = document.createElement('link');
  link.id = 'salt-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700;800&display=swap';
  document.head.appendChild(link);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDate(s) {
  if (!s) return '';
  const d = new Date(s);
  return isNaN(d) ? s : d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtDateShort(s) {
  if (!s) return '';
  const d = new Date(s);
  return isNaN(d) ? s : d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}
function getWeekRange() {
  const t = new Date(), day = t.getDay();
  const mon = new Date(t); mon.setDate(t.getDate() - (day === 0 ? 6 : day - 1));
  const fri = new Date(mon); fri.setDate(mon.getDate() + 4);
  const f = d => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
  return `${f(mon)} – ${f(fri)}, ${fri.getFullYear()}`;
}
function getWeekBounds() {
  const t = new Date(), day = t.getDay();
  const mon = new Date(t); mon.setDate(t.getDate() - (day === 0 ? 6 : day - 1));
  mon.setHours(0,0,0,0);
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6); sun.setHours(23,59,59,999);
  return { mon, sun };
}
function isDueThisWeek(due) {
  if (!due) return false;
  const d = new Date(due); if (isNaN(d)) return false;
  const { mon, sun } = getWeekBounds();
  return d >= mon && d <= sun;
}
function isThisWeek(task) { return !!(task.manualFlag || isDueThisWeek(task.due)); }
function personLabel(id) { return PERSON_LIST.find(p => p.id === id)?.label || id; }

// ── Milestone helpers ─────────────────────────────────────────────────────────
const MS_STATUSES = ['Upcoming', 'In Progress', 'Completed', 'At Risk'];
const msCfg = {
  'Upcoming':    { bg: '#F0F2F8', border: '#C8CEDD', text: '#4A5280', dot: '#8B95C0',  label: '○' },
  'In Progress': { bg: '#EBF3FF', border: '#90BFFF', text: '#1D4ED8', dot: '#3B82F6',  label: '◑' },
  'Completed':   { bg: '#ECFDF5', border: '#6EE7B7', text: '#065F46', dot: '#10B981',  label: '●' },
  'At Risk':     { bg: '#FFF1F1', border: '#FBBCBC', text: '#9B1C1C', dot: '#EF4444',  label: '⚠' },
};

function mkMilestone(name, date, status) {
  return { id: uid(), name: name || '', date: date || '', status: status || 'Upcoming' };
}

function initMilestones(project) {
  if (project.milestones && project.milestones.length > 0) return project.milestones;
  const ms = [];
  if (project.purchaseDate) ms.push(mkMilestone('Land Purchased', project.purchaseDate, 'Completed'));
  if (project.settlementDate) {
    const isPast = project.settlementDate < new Date().toISOString().slice(0,10);
    ms.push(mkMilestone('Settlement', project.settlementDate, isPast ? 'Completed' : 'Upcoming'));
  }
  return ms;
}


// ── Shared styles ─────────────────────────────────────────────────────────────
const F = { heading: "'DM Serif Display', serif", body: "'Outfit', sans-serif" };

const btn = (variant='ghost') => {
  const base = { fontFamily: F.body, cursor: 'pointer', fontWeight: 600, borderRadius: 6, fontSize: 11, padding: '4px 12px', transition: 'all 0.15s', display: 'inline-flex', alignItems: 'center', gap: 4 };
  const variants = {
    ghost:   { ...base, background: 'none', border: `1px solid ${T.navy3}`, color: T.slateL },
    primary: { ...base, background: T.gold, border: 'none', color: T.navy },
    danger:  { ...base, background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B' },
    dark:    { ...base, background: T.navy3, border: 'none', color: T.slateL },
  };
  return variants[variant] || variants.ghost;
};

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ label, cfg, small, dark }) {
  const c = dark && cfg.dark ? cfg.dark : cfg;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:3, padding:small?'2px 8px':'3px 11px', borderRadius:20, fontSize:small?10:11, fontWeight:600, background:c.bg, color:c.text, whiteSpace:'nowrap', fontFamily:F.body }}>
      {c.dot && <span style={{ width:5, height:5, borderRadius:'50%', background:c.dot, flexShrink:0 }} />}
      {label}
    </span>
  );
}

// ── Task row ──────────────────────────────────────────────────────────────────
function TaskRow({ task, onUpdate, onDelete, onToggleWeek, onToggleComplete, isOnly }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...task });
  const textRef = useRef(null);
  const done   = task.status === 'Completed';
  const has    = task.action?.trim();
  const autoTW = isDueThisWeek(task.due);

  const save = () => { onUpdate({ ...draft }); setEditing(false); };
  const enterEdit = () => { setDraft({ ...task }); setEditing(true); setTimeout(() => textRef.current?.focus(), 30); };

  const inputSty = { fontFamily:F.body, fontSize:11, border:`1px solid ${T.navy3}`, borderRadius:5, padding:'3px 8px', outline:'none', background:'white', color:'#1F2937' };

  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'8px 0', borderBottom:`1px solid ${isThisWeek(task)?'rgba(201,168,76,0.15)':'#F3F4F6'}`, background:isThisWeek(task)?'rgba(201,168,76,0.04)':'transparent', borderRadius:4 }}>
      <button onClick={onToggleComplete} style={{ flexShrink:0, marginTop:3, width:16, height:16, borderRadius:4, padding:0, cursor:'pointer', border:`2px solid ${done?T.green:'#D1D5DB'}`, background:done?T.green:'white', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s' }}>
        {done && <span style={{ color:'white', fontSize:9, fontWeight:900 }}>✓</span>}
      </button>

      {editing ? (
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
          <textarea ref={textRef} value={draft.action} onChange={e=>setDraft(d=>({...d,action:e.target.value}))}
            placeholder="Describe the action required..." rows={2}
            style={{ ...inputSty, resize:'vertical', width:'100%', boxSizing:'border-box', fontSize:12, padding:'6px 8px' }} />
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
            {[
              ['person', null, PERSON_LIST.map(p=>({v:p.id,l:p.label}))],
              ['priority', null, PRIORITIES.map(o=>({v:o,l:o}))],
              ['status', null, STATUSES.map(o=>({v:o,l:o}))],
            ].map(([field,,opts]) => (
              <select key={field} value={draft[field]} onChange={e=>setDraft(d=>({...d,[field]:e.target.value}))} style={inputSty}>
                {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            ))}
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ fontSize:10, color:T.slate, fontFamily:F.body }}>Due:</span>
              <input type="date" value={draft.due||''} onChange={e=>setDraft(d=>({...d,due:e.target.value}))} style={inputSty} />
            </div>
            <label style={{ fontSize:11, display:'flex', alignItems:'center', gap:4, cursor:'pointer', color:T.slate, fontFamily:F.body }}>
              <input type="checkbox" checked={draft.manualFlag||false} onChange={e=>setDraft(d=>({...d,manualFlag:e.target.checked}))} />
              Flag this week
            </label>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={()=>setEditing(false)} style={btn('ghost')}>Cancel</button>
            <button onClick={save} style={btn('primary')}>Save</button>
          </div>
        </div>
      ) : (
        <div style={{ flex:1, minWidth:0 }}>
          {has ? (
            <>
              <div style={{ fontSize:12, color:done?'#9CA3AF':'#1F2937', textDecoration:done?'line-through':'none', lineHeight:1.45, marginBottom:4, fontFamily:F.body, fontWeight:500 }}>{task.action}</div>
              <div style={{ display:'flex', gap:5, flexWrap:'wrap', alignItems:'center' }}>
                <span style={{ fontSize:10, fontWeight:600, color:T.navy, fontFamily:F.body }}>@{personLabel(task.person)}</span>
                {task.due && <span style={{ fontSize:10, color:autoTW?T.gold:'#9CA3AF', fontWeight:autoTW?700:400, fontFamily:F.body }}>· {fmtDateShort(task.due)}{autoTW?' ★':''}</span>}
                <Badge label={task.priority} cfg={priCfgNew[task.priority]||priCfgNew.Medium} small />
                <Badge label={task.status}   cfg={stsCfgNew[task.status]  ||stsCfgNew['Not Started']} small />
                {task.manualFlag && !autoTW && <span style={{ fontSize:9, color:T.goldDim, fontWeight:700, fontFamily:F.body }}>★ flagged</span>}
              </div>
            </>
          ) : <span style={{ fontSize:11, color:'#D1D5DB', fontStyle:'italic', fontFamily:F.body }}>No action — click Edit to add</span>}
        </div>
      )}

      {!editing && (
        <div style={{ display:'flex', gap:4, flexShrink:0, alignItems:'center' }}>
          {!autoTW && (
            <button onClick={onToggleWeek}
              style={{ padding:'2px 8px', borderRadius:20, fontSize:10, fontWeight:700, cursor:'pointer', fontFamily:F.body,
                border:`1.5px solid ${task.manualFlag?T.gold:'#E5E7EB'}`,
                background:task.manualFlag?T.goldLt:'white',
                color:task.manualFlag?T.goldDim:'#CBD5E1' }}>
              {task.manualFlag?'★':'☆'}
            </button>
          )}
          <button onClick={enterEdit} style={btn('ghost')}>Edit</button>
          {!isOnly && <button onClick={onDelete} style={btn('danger')}>✕</button>}
        </div>
      )}
    </div>
  );
}

// ── New task inline ───────────────────────────────────────────────────────────
function NewTaskRow({ onSave, onCancel }) {
  const [draft, setDraft] = useState({ action:'', person:'SS', priority:'Medium', status:'Not Started', due:'', manualFlag:false });
  const textRef = useRef(null);
  React.useEffect(() => { setTimeout(()=>textRef.current?.focus(), 30); }, []);
  const inputSty = { fontFamily:F.body, fontSize:11, border:`1px solid ${T.navy3}`, borderRadius:5, padding:'3px 8px', outline:'none', background:'white', color:'#1F2937' };

  return (
    <div style={{ padding:'10px 14px', background:'rgba(201,168,76,0.06)', borderTop:`1px solid ${T.goldLt}` }}>
      <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
        <textarea ref={textRef} value={draft.action} onChange={e=>setDraft(d=>({...d,action:e.target.value}))}
          placeholder="Describe the action required..." rows={2}
          style={{ ...inputSty, resize:'vertical', width:'100%', boxSizing:'border-box', fontSize:12, padding:'6px 8px' }} />
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
          {[['person', PERSON_LIST.map(p=>({v:p.id,l:p.label}))], ['priority', PRIORITIES.map(o=>({v:o,l:o}))], ['status', STATUSES.map(o=>({v:o,l:o}))]].map(([field,opts])=>(
            <select key={field} value={draft[field]} onChange={e=>setDraft(d=>({...d,[field]:e.target.value}))} style={inputSty}>
              {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          ))}
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <span style={{ fontSize:10, color:T.slate, fontFamily:F.body }}>Due:</span>
            <input type="date" value={draft.due} onChange={e=>setDraft(d=>({...d,due:e.target.value}))} style={inputSty} />
          </div>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          <button onClick={onCancel} style={btn('ghost')}>Cancel</button>
          <button onClick={()=>{ if(draft.action.trim()) onSave({...draft,id:uid(),thisWeek:false}); else onCancel(); }} style={btn('primary')}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

// ── Consultant block ──────────────────────────────────────────────────────────
function ConsultantBlock({ c, secColor, onUpdate, onAddTask, onUpdateTask, onDeleteTask, onToggleWeek, onToggleComplete, onDelete }) {
  const [editMeta, setEditMeta] = useState(false);
  const [meta, setMeta] = useState({ label:c.label, name:c.name, comments:c.comments });
  const [hovered, setHovered] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const twk = c.tasks.filter(t=>isThisWeek(t)).length;
  const saveMeta = () => { onUpdate({...c,...meta}); setEditMeta(false); setConfirmDel(false); };
  const inputSty = { fontFamily:F.body, fontSize:11, border:'1px solid #E5E7EB', borderRadius:5, padding:'3px 8px', outline:'none', width:'100%', boxSizing:'border-box' };

  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>{setHovered(false);setConfirmDel(false);}}
      style={{ borderBottom:'1px solid #EEF0F5', background:twk>0?'rgba(201,168,76,0.04)':'white', transition:'background 0.15s' }}>
      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 1fr', minHeight:56 }}>
        {/* Col 1 */}
        <div style={{ padding:'10px 14px', borderRight:'1px solid #EEF0F5', background:twk>0?'rgba(201,168,76,0.07)':'#FAFBFC', display:'flex', flexDirection:'column', gap:4 }}>
          {editMeta ? (
            <>
              <input value={meta.label} onChange={e=>setMeta(d=>({...d,label:e.target.value}))} placeholder="Role/type" style={{ ...inputSty, fontWeight:700, color:secColor }} />
              <input value={meta.name}  onChange={e=>setMeta(d=>({...d,name:e.target.value}))}  placeholder="Firm/contact" style={inputSty} />
              {confirmDel ? (
                <div style={{ display:'flex', gap:4, marginTop:2, flexWrap:'wrap', alignItems:'center' }}>
                  <span style={{ fontSize:10, color:'#991B1B', fontFamily:F.body }}>Remove this row?</span>
                  <button onClick={onDelete} style={{ ...btn('danger'), padding:'2px 8px', fontSize:10 }}>Yes</button>
                  <button onClick={()=>setConfirmDel(false)} style={{ ...btn('ghost'), padding:'2px 8px', fontSize:10 }}>No</button>
                </div>
              ) : (
                <div style={{ display:'flex', gap:4, marginTop:2 }}>
                  <button onClick={()=>setEditMeta(false)} style={{ ...btn('ghost'), padding:'2px 8px', fontSize:10 }}>Cancel</button>
                  <button onClick={saveMeta} style={{ ...btn('primary'), padding:'2px 8px', fontSize:10 }}>Save</button>
                  <button onClick={()=>setConfirmDel(true)} style={{ ...btn('danger'), padding:'2px 8px', fontSize:10 }}>Remove</button>
                </div>
              )}
            </>
          ) : (
            <>
              <div style={{ fontSize:11, fontWeight:700, color:secColor, textTransform:'uppercase', letterSpacing:'0.05em', lineHeight:1.2, fontFamily:F.body }}>{c.label}</div>
              <div style={{ fontSize:11, color:T.slate, fontStyle:c.name?'normal':'italic', fontFamily:F.body }}>{c.name||'—'}</div>
              {hovered && (
                <button onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}}
                  style={{ ...btn('ghost'), marginTop:3, padding:'2px 10px', fontSize:10, alignSelf:'flex-start' }}>Edit</button>
              )}
              {twk>0 && <span style={{ fontSize:9, background:T.gold, color:T.navy, padding:'2px 7px', borderRadius:20, fontWeight:700, alignSelf:'flex-start', marginTop:2, fontFamily:F.body }}>★ {twk} this week</span>}
            </>
          )}
        </div>
        {/* Col 2 */}
        <div style={{ padding:'10px 14px', borderRight:'1px solid #EEF0F5' }}>
          {editMeta ? (
            <textarea value={meta.comments} onChange={e=>setMeta(d=>({...d,comments:e.target.value}))} placeholder="General comments, status notes, background info..." rows={4}
              style={{ fontFamily:F.body, fontSize:11, border:'1px solid #E5E7EB', borderRadius:5, padding:'5px 8px', outline:'none', resize:'vertical', width:'100%', boxSizing:'border-box', color:'#4B5563' }} />
          ) : c.comments ? (
            <div style={{ fontSize:11, color:'#4B5563', lineHeight:1.6, whiteSpace:'pre-wrap', cursor:'pointer', fontFamily:F.body }}
              onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}}>{c.comments}</div>
          ) : (
            <div style={{ fontSize:11, color:'#D1D5DB', fontStyle:'italic', cursor:'pointer', fontFamily:F.body }}
              onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}}>Add comments…</div>
          )}
        </div>
        {/* Col 3 */}
        <div style={{ padding:'8px 14px', display:'flex', flexDirection:'column' }}>
          {c.tasks.map(t=>(
            <TaskRow key={t.id} task={t} isOnly={c.tasks.length===1}
              onUpdate={u=>onUpdateTask(c.id,t.id,u)} onDelete={()=>onDeleteTask(c.id,t.id)}
              onToggleWeek={()=>onToggleWeek(c.id,t.id)} onToggleComplete={()=>onToggleComplete(c.id,t.id)} />
          ))}
          {!addingTask && (
            <button onClick={()=>setAddingTask(true)}
              style={{ marginTop:8, padding:'5px 0', fontSize:11, color:T.gold, background:'none', border:`1px dashed ${T.gold}`, borderRadius:6, cursor:'pointer', fontWeight:600, textAlign:'center', fontFamily:F.body, opacity:0.8 }}>
              + Add Task
            </button>
          )}
        </div>
      </div>
      {addingTask && <NewTaskRow onSave={td=>{onAddTask(c.id,td);setAddingTask(false);}} onCancel={()=>setAddingTask(false)} />}
    </div>
  );
}


// ── Milestone Timeline ────────────────────────────────────────────────────────
function MilestoneTimeline({ milestones, onUpdate, onAdd, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newMs, setNewMs] = useState({ name: '', date: '', status: 'Upcoming' });

  const startEdit = (ms) => { setEditingId(ms.id); setDraft({ ...ms }); };
  const saveEdit  = () => { onUpdate(draft); setEditingId(null); };
  const cancelEdit = () => setEditingId(null);

  const inputSty = {
    fontFamily: F.body, fontSize: 11, border: '1px solid #D1D5DB',
    borderRadius: 5, padding: '3px 7px', outline: 'none',
    background: 'white', color: '#1F2937',
  };

  const today = new Date().toISOString().slice(0,10);

  return (
    <div style={{ marginBottom: 20, background: 'white', borderRadius: 12, padding: '16px 20px', border: '1px solid #E8ECF5', boxShadow: '0 2px 8px rgba(10,15,46,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.navy, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: F.body }}>Key Milestones</span>
        <div style={{ flex: 1, height: 1, background: T.navy3 }} />
        <button onClick={() => { setShowAdd(true); setNewMs({ name: '', date: '', status: 'Upcoming' }); }}
          style={{ ...btn('dark'), fontSize: 10, padding: '3px 10px', background: 'rgba(201,168,76,0.1)', border: `1px solid ${T.gold}44`, color: T.gold }}>
          + Add Milestone
        </button>
      </div>

      {/* Scrollable timeline row */}
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, alignItems: 'stretch' }}>
        {milestones.length === 0 && !showAdd && (
          <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: F.body, fontStyle: 'italic', padding: '12px 0' }}>
            No milestones yet — click + Add Milestone to get started
          </div>
        )}

        {milestones.map((ms, idx) => {
          const cfg = msCfg[ms.status] || msCfg['Upcoming'];
          const isEditing = editingId === ms.id;
          const daysUntil = ms.date ? Math.ceil((new Date(ms.date) - new Date()) / 86400000) : null;

          return (
            <div key={ms.id} style={{ flexShrink: 0, width: 170, borderRadius: 10, border: `1.5px solid ${isEditing ? T.gold : cfg.border}`, background: isEditing ? 'rgba(201,168,76,0.08)' : cfg.bg, padding: '12px 14px', position: 'relative', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Connector line */}
              {idx < milestones.length - 1 && (
                <div style={{ position: 'absolute', right: -10, top: '50%', width: 10, height: 1, background: T.navy3, zIndex: 1 }} />
              )}

              {isEditing ? (
                <>
                  <input value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} placeholder="Milestone name"
                    style={{ ...inputSty, fontWeight: 600, fontSize: 12, marginBottom: 2 }} autoFocus />
                  <input type="date" value={draft.date} onChange={e => setDraft(d => ({ ...d, date: e.target.value }))} style={inputSty} />
                  <select value={draft.status} onChange={e => setDraft(d => ({ ...d, status: e.target.value }))}
                    style={{ ...inputSty, cursor: 'pointer' }}>
                    {MS_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
                    <button onClick={cancelEdit} style={{ ...btn('dark'), flex: 1, fontSize: 10, padding: '3px 0', background: 'rgba(255,255,255,0.05)', border: `1px solid ${T.navy3}`, color: T.slateL, justifyContent: 'center' }}>Cancel</button>
                    <button onClick={saveEdit} style={{ ...btn('primary'), flex: 1, fontSize: 10, padding: '3px 0', justifyContent: 'center' }}>Save</button>
                  </div>
                  <button onClick={() => onDelete(ms.id)} style={{ fontSize: 9, color: T.red, background: 'none', border: 'none', cursor: 'pointer', fontFamily: F.body, textAlign: 'center', opacity: 0.7 }}>Remove</button>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1F3C', fontFamily: F.body, lineHeight: 1.3, flex: 1 }}>{ms.name || 'Untitled'}</div>
                    <span style={{ fontSize: 14, lineHeight: 1 }}>{cfg.label}</span>
                  </div>
                  {ms.date && (
                    <div style={{ fontSize: 11, color: '#374151', fontFamily: F.body, fontWeight: 600 }}>{fmtDate(ms.date)}</div>
                  )}
                  {!ms.date && <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: F.body, fontStyle: 'italic' }}>No date set</div>}
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: cfg.text, background: `${cfg.border}22`, padding: '2px 7px', borderRadius: 20, fontFamily: F.body }}>{ms.status}</span>
                    {daysUntil !== null && ms.status !== 'Completed' && (
                      <span style={{ fontSize: 9, color: daysUntil < 0 ? '#DC2626' : daysUntil < 14 ? '#D97706' : '#6B7280', fontFamily: F.body, fontWeight: 600 }}>
                        {daysUntil < 0 ? `${Math.abs(daysUntil)}d overdue` : daysUntil === 0 ? 'Today' : `${daysUntil}d`}
                      </span>
                    )}
                  </div>
                  <button onClick={() => startEdit(ms)} style={{ fontSize: 10, color: '#6B7280', background: 'none', border: '1px solid #E5E7EB', borderRadius: 4, cursor: 'pointer', fontFamily: F.body, padding: '2px 8px' }}>Edit</button>
                </>
              )}
            </div>
          );
        })}

        {/* Add new milestone inline card */}
        {showAdd && (
          <div style={{ flexShrink: 0, width: 175, borderRadius: 10, border: `1.5px solid ${T.gold}`, background: '#FFFBEB', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <input value={newMs.name} onChange={e => setNewMs(d => ({ ...d, name: e.target.value }))} placeholder="Milestone name"
              style={{ ...inputSty, fontWeight: 600, fontSize: 12 }} autoFocus />
            <input type="date" value={newMs.date} onChange={e => setNewMs(d => ({ ...d, date: e.target.value }))} style={inputSty} />
            <select value={newMs.status} onChange={e => setNewMs(d => ({ ...d, status: e.target.value }))} style={{ ...inputSty, cursor: 'pointer' }}>
              {MS_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
              <button onClick={() => setShowAdd(false)} style={{ ...btn('dark'), flex: 1, fontSize: 10, padding: '3px 0', background: 'rgba(255,255,255,0.05)', border: `1px solid ${T.navy3}`, color: T.slateL, justifyContent: 'center' }}>Cancel</button>
              <button onClick={() => { if (newMs.name.trim()) { onAdd(newMs); setShowAdd(false); } }}
                style={{ ...btn('primary'), flex: 1, fontSize: 10, padding: '3px 0', justifyContent: 'center' }}>Add</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section block ─────────────────────────────────────────────────────────────
function SectionBlock({ sec, consultants, purchaseDate, settlementDate, onUpdateC, onAddC, onDeleteC, onAddTask, onUpdateTask, onDeleteTask, onToggleWeek, onToggleComplete, collapsed, onToggleCollapse }) {
  const twk    = consultants.flatMap(c=>c.tasks).filter(t=>isThisWeek(t)).length;
  const active = consultants.flatMap(c=>c.tasks).filter(t=>t.action?.trim()).length;
  return (
    <div style={{ marginBottom:16, borderRadius:12, overflow:'hidden', border:'1px solid #E8ECF5', boxShadow:'0 2px 8px rgba(10,15,46,0.06)' }}>
      <div style={{ display:'flex', alignItems:'center', background:sec.color }}>
        <button onClick={onToggleCollapse} style={{ flex:1, display:'flex', alignItems:'center', gap:10, padding:'12px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
          <span style={{ fontSize:16 }}>{sec.icon}</span>
          <span style={{ fontSize:13, fontWeight:700, color:'white', fontFamily:F.body, letterSpacing:'0.01em' }}>{sec.title}</span>
          {sec.id==='finance'&&(purchaseDate||settlementDate)&&(
            <span style={{ fontSize:10, color:'rgba(255,255,255,0.55)', marginLeft:4, fontFamily:F.body }}>
              {purchaseDate&&`📅 ${fmtDateShort(purchaseDate)}`}{purchaseDate&&settlementDate&&'  ·  '}{settlementDate&&`🏁 ${fmtDateShort(settlementDate)}`}
            </span>
          )}
          <span style={{ flex:1 }} />
          {twk>0&&<span style={{ fontSize:10, background:'rgba(201,168,76,0.9)', color:T.navy, padding:'2px 9px', borderRadius:20, fontWeight:700, fontFamily:F.body }}>★ {twk} this week</span>}
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.45)', marginLeft:8, fontFamily:F.body }}>{active} action{active!==1?'s':''} · {collapsed?'▶':'▼'}</span>
        </button>
        {!collapsed&&<button onClick={onAddC} style={{ margin:'0 14px', padding:'4px 14px', fontSize:11, fontWeight:700, background:'rgba(255,255,255,0.12)', color:'white', border:'1px solid rgba(255,255,255,0.25)', borderRadius:20, cursor:'pointer', fontFamily:F.body, whiteSpace:'nowrap' }}>+ Add Row</button>}
      </div>
      {!collapsed&&(
        <>
          <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 1fr', background:'#F8F9FD', borderBottom:'1px solid #EEF0F5' }}>
            {['Consultant / Authority','General Comments','Action Items'].map((h,i)=>(
              <div key={h} style={{ padding:'6px 14px', fontSize:9, fontWeight:700, color:T.slateL, textTransform:'uppercase', letterSpacing:'0.1em', borderRight:i<2?'1px solid #EEF0F5':'none', fontFamily:F.body }}>{h}</div>
            ))}
          </div>
          {consultants.map(c=>(
            <ConsultantBlock key={c.id} c={c} secColor={sec.color}
              onUpdate={u=>onUpdateC(sec.id,c.id,u)} onDelete={()=>onDeleteC(sec.id,c.id)}
              onAddTask={(cId,td)=>onAddTask(sec.id,cId,td)}
              onUpdateTask={(cId,tId,u)=>onUpdateTask(sec.id,cId,tId,u)}
              onDeleteTask={(cId,tId)=>onDeleteTask(sec.id,cId,tId)}
              onToggleWeek={(cId,tId)=>onToggleWeek(sec.id,cId,tId)}
              onToggleComplete={(cId,tId)=>onToggleComplete(sec.id,cId,tId)} />
          ))}
        </>
      )}
    </div>
  );
}

// ── This Week row ─────────────────────────────────────────────────────────────
function WeekRow({ item, onToggleWeek, onToggleComplete, onOpen }) {
  const done   = item.status==='Completed';
  const autoTW = isDueThisWeek(item.due);
  return (
    <div style={{ background:done?'#FAFAFA':'white', border:'1px solid #ECEEF5', borderLeft:`3px solid ${item.projectColor}`, borderRadius:8, marginBottom:6, padding:'12px 16px', display:'flex', alignItems:'flex-start', gap:12, opacity:done?0.6:1, boxShadow:'0 1px 3px rgba(10,15,46,0.04)', transition:'box-shadow 0.15s' }}
      onMouseEnter={e=>{if(!done)e.currentTarget.style.boxShadow='0 3px 12px rgba(10,15,46,0.1)';}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 1px 3px rgba(10,15,46,0.04)';}}>
      <button onClick={()=>onToggleComplete(item.projectId,item.secId,item.cId,item.tId)}
        style={{ flexShrink:0, marginTop:2, width:18, height:18, borderRadius:4, border:`2px solid ${done?T.green:'#D1D5DB'}`, background:done?T.green:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', padding:0 }}>
        {done&&<span style={{ color:'white', fontSize:9, fontWeight:900 }}>✓</span>}
      </button>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', marginBottom:4 }}>
          <span style={{ fontSize:10, fontWeight:700, color:item.projectColor, textTransform:'uppercase', letterSpacing:'0.05em', fontFamily:F.body }}>{item.projectName}</span>
          <span style={{ color:'#D1D5DB', fontSize:10 }}>›</span>
          <span style={{ fontSize:10, color:T.slateL, fontFamily:F.body }}>{item.secTitle}</span>
          <span style={{ color:'#D1D5DB', fontSize:10 }}>›</span>
          <span style={{ fontSize:10, color:T.slate, fontFamily:F.body }}>{item.cLabel}{item.cName?` · ${item.cName}`:''}</span>
        </div>
        <div style={{ fontSize:13, fontWeight:600, color:done?'#9CA3AF':'#1A1F3C', textDecoration:done?'line-through':'none', marginBottom:5, fontFamily:F.body, lineHeight:1.4 }}>{item.action}</div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontSize:11, fontWeight:600, color:T.navy, fontFamily:F.body }}>@{personLabel(item.person)}</span>
          {item.due&&<span style={{ fontSize:11, color:autoTW?T.gold:'#9CA3AF', fontWeight:autoTW?700:400, fontFamily:F.body }}>Due {fmtDate(item.due)}</span>}
          <Badge label={item.priority} cfg={priCfgNew[item.priority]||priCfgNew.Medium} small />
          <Badge label={item.status}   cfg={stsCfgNew[item.status]  ||stsCfgNew['Not Started']} small />
          {autoTW&&<span style={{ fontSize:9, color:T.goldDim, background:T.goldLt, padding:'2px 7px', borderRadius:20, fontWeight:700, fontFamily:F.body }}>Auto ★</span>}
          {!autoTW&&item.manualFlag&&<span style={{ fontSize:9, color:'#92400E', background:'#FEF3C7', padding:'2px 7px', borderRadius:20, fontWeight:700, fontFamily:F.body }}>Flagged</span>}
        </div>
      </div>
      <div style={{ display:'flex', gap:6, flexShrink:0 }}>
        {!autoTW&&(
          <button onClick={()=>onToggleWeek(item.projectId,item.secId,item.cId,item.tId)}
            style={{ ...btn('ghost'), background:T.goldLt, border:`1.5px solid ${T.gold}`, color:T.goldDim }}>
            {item.manualFlag?'★ Remove':'☆ Flag'}
          </button>
        )}
        <button onClick={()=>onOpen(item.projectId)} style={btn('ghost')}>Open →</button>
      </div>
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  const [hov, setHov] = useState(false);
  const all = SECTION_META.flatMap(s=>(project.sections[s.id]||[]).flatMap(c=>c.tasks));
  const act = all.filter(t=>t.action?.trim());
  const dn  = all.filter(t=>t.status==='Completed');
  const tw  = all.filter(t=>isThisWeek(t)&&t.action?.trim()).length;
  const hi  = all.filter(t=>t.priority==='High'&&t.status!=='Completed'&&t.action?.trim()).length;
  const pct = act.length ? Math.round((dn.length/act.length)*100) : 0;

  return (
    <div onClick={()=>onOpen(project.id)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:hov?T.navy2:T.navy, border:`1px solid ${hov?T.navy4:T.navy3}`, borderRadius:14, padding:'20px 22px', cursor:'pointer', userSelect:'none', transition:'all 0.2s', boxShadow:hov?'0 12px 40px rgba(10,15,46,0.35)':'0 4px 16px rgba(10,15,46,0.2)', position:'relative', overflow:'hidden' }}>
      {/* Colour accent bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:project.color, borderRadius:'14px 14px 0 0' }} />
      {/* Project name + dot */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:T.white, marginBottom:5, fontFamily:F.body, letterSpacing:'0.01em' }}>{project.name}</div>
          <span style={{ display:'inline-flex', padding:'3px 10px', borderRadius:20, fontSize:10, fontWeight:600, background:'rgba(201,168,76,0.15)', color:T.gold, fontFamily:F.body }}>{project.stage}</span>
        </div>
        <div style={{ width:38, height:38, borderRadius:'50%', background:project.color, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:15, fontWeight:700, flexShrink:0, fontFamily:F.heading, boxShadow:`0 4px 12px ${project.color}55` }}>
          {project.name[0]}
        </div>
      </div>
      {/* Stats */}
      <div style={{ display:'flex', gap:0, marginBottom:14, borderRadius:8, overflow:'hidden', border:`1px solid ${T.navy3}` }}>
        {[['Tasks',act.length,T.slateL],['Done',dn.length,T.green],['This Wk',tw,T.gold],['High ⚠',hi,hi>0?T.red:T.slateL]].map(([l,v,c],i)=>(
          <div key={l} style={{ flex:1, textAlign:'center', padding:'8px 4px', borderRight:i<3?`1px solid ${T.navy3}`:'none', background:'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize:18, fontWeight:800, color:c, fontFamily:F.body, lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:8, color:T.slate, textTransform:'uppercase', letterSpacing:'0.08em', marginTop:3, fontFamily:F.body }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div style={{ marginBottom:6 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
          <span style={{ fontSize:10, color:T.slate, fontFamily:F.body }}>Progress</span>
          <span style={{ fontSize:10, color:T.slateL, fontFamily:F.body }}>{pct}%</span>
        </div>
        <div style={{ height:4, background:T.navy3, borderRadius:10 }}>
          <div style={{ height:'100%', width:`${pct}%`, background:project.color, borderRadius:10, transition:'width 0.4s', boxShadow:`0 0 8px ${project.color}88` }} />
        </div>
      </div>
      {/* Dates */}
      {(project.purchaseDate||project.settlementDate)&&(
        <div style={{ fontSize:10, color:T.slate, fontFamily:F.body, marginTop:8 }}>
          {project.purchaseDate&&`📅 ${fmtDateShort(project.purchaseDate)}`}{project.purchaseDate&&project.settlementDate&&'  ·  '}{project.settlementDate&&`🏁 ${fmtDateShort(project.settlementDate)}`}
        </div>
      )}
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ projects, onOpen }) {
  const [filterPerson, setFilterPerson] = useState('all');
  const [taskOrder, setTaskOrder] = useState({});
  const DASH_PEOPLE = [{ id:'all', label:'Everyone' },{ id:'CS', label:'Carson Bolt' },{ id:'SS', label:'Shannon Sharp' },{ id:'AL', label:'Assem Labib' }];

  const allTasks = useMemo(()=>{
    const tasks=[];
    projects.forEach(p=>{ SECTION_META.forEach(sec=>{ (p.sections[sec.id]||[]).forEach(c=>{ c.tasks.forEach(t=>{ if(!t.action?.trim()) return; tasks.push({...t,projectId:p.id,projectName:p.name,projectColor:p.color,secTitle:sec.title,cLabel:c.label}); }); }); }); });
    return tasks;
  },[projects]);

  const getTasksForPerson = (pid) => {
    const raw = pid==='all' ? allTasks : allTasks.filter(t=>t.person===pid||t.person==='ALL');
    const order = taskOrder[pid]||[];
    const ordered=[]; const remaining=[...raw];
    order.forEach(id=>{ const idx=remaining.findIndex(t=>t.id===id); if(idx!==-1){ordered.push(remaining[idx]);remaining.splice(idx,1);} });
    remaining.sort((a,b)=>{ const pd=(PRI_ORDER[a.priority]??1)-(PRI_ORDER[b.priority]??1); if(pd!==0) return pd; if(a.due&&!b.due) return -1; if(!a.due&&b.due) return 1; if(a.due&&b.due) return new Date(a.due)-new Date(b.due); return 0; });
    return [...ordered,...remaining];
  };

  const moveTask = (pid,taskId,dir)=>{
    const tasks=getTasksForPerson(pid); const ids=tasks.map(t=>t.id); const idx=ids.indexOf(taskId);
    if(dir==='up'&&idx>0){[ids[idx-1],ids[idx]]=[ids[idx],ids[idx-1]];}
    if(dir==='down'&&idx<ids.length-1){[ids[idx],ids[idx+1]]=[ids[idx+1],ids[idx]];}
    setTaskOrder(o=>({...o,[pid]:ids}));
  };

  const peopleToShow = filterPerson==='all' ? ['CS','SS','AL'] : [filterPerson];

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <h2 style={{ margin:0, fontSize:22, color:T.navy, fontFamily:F.heading, fontWeight:400, letterSpacing:'-0.01em' }}>Team Dashboard</h2>
        <div style={{ display:'flex', gap:6 }}>
          {DASH_PEOPLE.map(p=>(
            <button key={p.id} onClick={()=>setFilterPerson(p.id)}
              style={{ padding:'7px 16px', borderRadius:20, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:F.body, transition:'all 0.15s',
                border:`1.5px solid ${filterPerson===p.id?T.gold:'#E5E7EB'}`,
                background:filterPerson===p.id?T.gold:'white',
                color:filterPerson===p.id?T.navy:'#6B7280' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${peopleToShow.length},1fr)`, gap:16 }}>
        {peopleToShow.map(pid=>{
          const person=PERSON_LIST.find(p=>p.id===pid);
          const tasks=getTasksForPerson(pid);
          const hi=tasks.filter(t=>t.priority==='High'&&t.status!=='Completed').length;
          const done=tasks.filter(t=>t.status==='Completed').length;
          return (
            <div key={pid} style={{ background:T.navy, borderRadius:12, overflow:'hidden', boxShadow:'0 4px 20px rgba(10,15,46,0.2)' }}>
              <div style={{ background:T.navy2, padding:'14px 18px', borderBottom:`1px solid ${T.navy3}` }}>
                <div style={{ fontSize:14, fontWeight:700, color:T.white, marginBottom:3, fontFamily:F.body }}>{person?.label}</div>
                <div style={{ display:'flex', gap:12 }}>
                  <span style={{ fontSize:11, color:T.slateL, fontFamily:F.body }}>{tasks.length} tasks</span>
                  <span style={{ fontSize:11, color:'#FCA5A5', fontFamily:F.body }}>{hi} high</span>
                  <span style={{ fontSize:11, color:'#6EE7B7', fontFamily:F.body }}>{done} done</span>
                </div>
              </div>
              <div style={{ maxHeight:'calc(100vh - 280px)', overflowY:'auto' }}>
                {tasks.length===0&&<div style={{ padding:'28px 18px', textAlign:'center', color:T.slate, fontSize:12, fontFamily:F.body }}>No tasks assigned</div>}
                {tasks.map((t,idx)=>{
                  const isDone=t.status==='Completed';
                  const tw=isThisWeek(t);
                  return (
                    <div key={t.id} onClick={()=>onOpen(t.projectId)}
                      style={{ padding:'12px 16px', borderBottom:`1px solid ${T.navy3}`, background:isDone?'rgba(255,255,255,0.02)':tw?'rgba(201,168,76,0.06)':'transparent', cursor:'pointer', transition:'background 0.12s', opacity:isDone?0.55:1 }}
                      onMouseEnter={e=>{if(!isDone)e.currentTarget.style.background=tw?'rgba(201,168,76,0.12)':'rgba(255,255,255,0.05)';}}
                      onMouseLeave={e=>{e.currentTarget.style.background=isDone?'rgba(255,255,255,0.02)':tw?'rgba(201,168,76,0.06)':'transparent';}}>
                      <div style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:12, fontWeight:600, color:isDone?T.slate:T.white, textDecoration:isDone?'line-through':'none', marginBottom:4, lineHeight:1.4, fontFamily:F.body }}>{t.action}</div>
                          <div style={{ display:'flex', gap:5, flexWrap:'wrap', alignItems:'center', marginBottom:4 }}>
                            <span style={{ fontSize:10, fontWeight:700, color:t.projectColor, fontFamily:F.body }}>{t.projectName}</span>
                            <span style={{ color:T.navy3, fontSize:10 }}>·</span>
                            <span style={{ fontSize:10, color:T.slateL, fontFamily:F.body }}>{t.secTitle}</span>
                          </div>
                          <div style={{ display:'flex', gap:5, flexWrap:'wrap', alignItems:'center' }}>
                            <Badge label={t.priority} cfg={priCfgNew[t.priority]||priCfgNew.Medium} small dark />
                            <Badge label={t.status} cfg={stsCfgNew[t.status]||stsCfgNew['Not Started']} small />
                            {tw&&<span style={{ fontSize:9, color:T.gold, background:'rgba(201,168,76,0.15)', padding:'1px 6px', borderRadius:20, fontWeight:700, fontFamily:F.body }}>This week</span>}
                          </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:5, flexShrink:0 }}>
                          {t.due ? (
                            <span style={{ fontSize:10, fontWeight:700, color:tw?T.gold:T.slateL, background:tw?'rgba(201,168,76,0.12)':'rgba(255,255,255,0.06)', padding:'3px 9px', borderRadius:20, whiteSpace:'nowrap', fontFamily:F.body }}>
                              {tw?'★ ':''}{fmtDateShort(t.due)}
                            </span>
                          ) : <span style={{ fontSize:10, color:T.navy3, fontFamily:F.body }}>—</span>}
                          <div style={{ display:'flex', gap:2 }} onClick={e=>e.stopPropagation()}>
                            <button onClick={e=>{e.stopPropagation();moveTask(pid,t.id,'up');}} disabled={idx===0}
                              style={{ padding:'1px 6px', fontSize:9, cursor:idx===0?'default':'pointer', background:'none', border:`1px solid ${idx===0?T.navy3:T.slate}`, borderRadius:3, color:idx===0?T.navy3:T.slateL, lineHeight:1 }}>▲</button>
                            <button onClick={e=>{e.stopPropagation();moveTask(pid,t.id,'down');}} disabled={idx===tasks.length-1}
                              style={{ padding:'1px 6px', fontSize:9, cursor:idx===tasks.length-1?'default':'pointer', background:'none', border:`1px solid ${idx===tasks.length-1?T.navy3:T.slate}`, borderRadius:3, color:idx===tasks.length-1?T.navy3:T.slateL, lineHeight:1 }}>▼</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('id');
      if (error) throw error;
      if (!data || data.length === 0) {
        const seed = buildProjects();
        await Promise.all(seed.map(p =>
          supabase.from('projects').upsert({ id: p.id, data: p, updated_at: new Date().toISOString() })
        ));
        setProjects(seed);
      } else {
        setProjects(data.map(row => row.data));
      }
    } catch (err) {
      console.error('Error loading projects:', err);
      setProjects(buildProjects());
    } finally {
      setLoading(false);
    }
  }, []);

  const saveProject = useCallback(async (updatedProject) => {
    try {
      await supabase.from('projects').upsert({
        id: updatedProject.id,
        data: updatedProject,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error saving project:', err);
    }
  }, []);

  useEffect(() => {
    loadProjects();
    const channel = supabase
      .channel('projects-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        loadProjects();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [loadProjects]);
  const [page, setPage] = useState('thisweek');
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [filterPersons, setFilterPersons] = useState([]);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [collapsed, setCollapsed] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newStage, setNewStage] = useState('Planning & Approvals');

  const openProject = id=>{setActiveId(id);setPage('project');};
  const goBack      = () =>{setActiveId(null);setPage('projects');};
  const goHome      = () =>{setActiveId(null);setPage('thisweek');};
  const activeProject = projects.find(p=>p.id===activeId);

  const mutate = fn => {
    setProjects(ps => {
      const next = ps.map(p => {
        if (p.id !== activeId) return p;
        const updated = fn(p);
        saveProject(updated);
        return updated;
      });
      return next;
    });
  };
  const updC  = (sId,cId,u)     => mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?u:c)}}));
  const addC  = sId              => mutate(p=>({...p,sections:{...p.sections,[sId]:[...p.sections[sId],mkRow()]}}));
  const delC  = (sId,cId)        => mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].filter(c=>c.id!==cId)}}));
  const addT  = (sId,cId,td)     => mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:[...c.tasks,td||mkTask()]}:c)}}));
  const updT  = (sId,cId,tId,u)  => mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?u:t)}:c)}}));
  const delT  = (sId,cId,tId)    => mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.filter(t=>t.id!==tId)}:c)}}));
  const togW  = (sId,cId,tId)    => mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?{...t,manualFlag:!t.manualFlag}:t)}:c)}}));
  const togC  = (sId,cId,tId)    => mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?{...t,status:t.status==='Completed'?'In Progress':'Completed'}:t)}:c)}}));
  // Milestone mutations
  const updMilestone = (msId, updated) => mutate(p => ({
    ...p,
    milestones: (p.milestones || initMilestones(p)).map(m => m.id === msId ? updated : m)
  }));
  const addMilestone = (ms) => mutate(p => ({
    ...p,
    milestones: [...(p.milestones || initMilestones(p)), mkMilestone(ms.name, ms.date, ms.status)]
  }));
  const delMilestone = (msId) => mutate(p => ({
    ...p,
    milestones: (p.milestones || initMilestones(p)).filter(m => m.id !== msId)
  }));

  const gTog  = (pId,sId,cId,tId,type)=>setProjects(ps=>ps.map(p=>{
    if(p.id!==pId) return p;
    const updated = {...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id!==cId?c:{...c,tasks:c.tasks.map(t=>t.id!==tId?t:type==='week'?{...t,manualFlag:!t.manualFlag}:{...t,status:t.status==='Completed'?'In Progress':'Completed'})})}};
    saveProject(updated);
    return updated;
  }));

  const addProject=()=>{
    if(!newName.trim()) return;
    const colors=[T.gold,'#1E1E5A','#E07B39','#5B4FCF','#2D6A4F','#B5451B','#7B5EA7','#0E6B5E'];
    const secs={}; SECTION_META.forEach(s=>{secs[s.id]=[];});
    const newProj = {id:uid(),name:newName.trim(),color:colors[projects.length%colors.length],stage:newStage,purchaseDate:'',settlementDate:'',sections:secs};
    setProjects(ps=>[...ps,newProj]);
    saveProject(newProj);
    setNewName(''); setShowAdd(false);
  };

  const togglePerson=pid=>setFilterPersons(prev=>prev.includes(pid)?prev.filter(p=>p!==pid):[...prev,pid]);

  const thisWeekItems=useMemo(()=>{
    const items=[];
    projects.forEach(p=>{SECTION_META.forEach(sec=>{(p.sections[sec.id]||[]).forEach(c=>{c.tasks.forEach(t=>{
      if(t.action?.trim()&&isThisWeek(t)) items.push({...t,projectId:p.id,projectName:p.name,projectColor:p.color,secId:sec.id,secTitle:sec.title,cId:c.id,cLabel:c.label,cName:c.name,tId:t.id});
    });});});});
    return items;
  },[projects]);

  const total=thisWeekItems.length, done=thisWeekItems.filter(i=>i.status==='Completed').length,
    high=thisWeekItems.filter(i=>i.priority==='High'&&i.status!=='Completed').length, remaining=total-done;

  const filtered=useMemo(()=>thisWeekItems.filter(i=>{
    const ms=!search||i.action?.toLowerCase().includes(search.toLowerCase())||i.cName?.toLowerCase().includes(search.toLowerCase());
    const mp=filterPersons.length===0||filterPersons.includes(i.person);
    const mpr=filterPriority==='All'||i.priority===filterPriority;
    const mst=filterStatus==='All'||(filterStatus==='High'&&i.priority==='High'&&i.status!=='Completed')||(filterStatus==='Done'&&i.status==='Completed')||(filterStatus==='Remaining'&&i.status!=='Completed');
    return ms&&mp&&mpr&&mst;
  }),[thisWeekItems,search,filterPersons,filterPriority,filterStatus]);

  const today=new Date();

  function StatPill({label,value,color,filterId,sub}) {
    const active=filterStatus===filterId;
    return (
      <div onClick={()=>setFilterStatus(active?'All':filterId)}
        style={{ textAlign:'center', padding:'0 20px', borderLeft:`1px solid rgba(255,255,255,0.1)`, cursor:'pointer', transition:'opacity 0.15s', opacity:active?1:0.75 }}>
        <div style={{ fontSize:32, fontWeight:800, color, lineHeight:1, paddingBottom:4, borderBottom:active?`2px solid ${color}`:'2px solid transparent', fontFamily:F.body }}>{value}</div>
        <div style={{ fontSize:9, color:'rgba(255,255,255,0.45)', marginTop:5, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:F.body }}>{label}</div>
        {active&&<div style={{ fontSize:8, color, marginTop:2, fontWeight:700, fontFamily:F.body }}>● active</div>}
      </div>
    );
  }

  function FilterBar() {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:18 }}>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search actions, consultants…"
            style={{ flex:1, minWidth:200, padding:'9px 16px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:12, outline:'none', background:'white', fontFamily:F.body, color:'#1A1F3C' }} />
          <select value={filterPriority} onChange={e=>setFilterPriority(e.target.value)}
            style={{ padding:'9px 12px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:12, background:'white', cursor:'pointer', fontFamily:F.body }}>
            {['All',...PRIORITIES].map(o=><option key={o}>{o==='All'?'All Priorities':o}</option>)}
          </select>
          {(filterStatus!=='All'||filterPersons.length>0||search)&&(
            <button onClick={()=>{setFilterStatus('All');setFilterPersons([]);setSearch('');}}
              style={{ ...btn('ghost'), padding:'9px 16px', fontSize:12, border:'1.5px solid #E5E7EB' }}>✕ Clear all</button>
          )}
        </div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontSize:11, color:T.slateL, marginRight:2, fontFamily:F.body }}>Team member:</span>
          {PERSON_LIST.filter(p=>['CS','SS','AL'].includes(p.id)).map(p=>{
            const active=filterPersons.includes(p.id);
            return (
              <button key={p.id} onClick={()=>togglePerson(p.id)}
                style={{ padding:'5px 16px', borderRadius:20, fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:F.body, transition:'all 0.15s',
                  border:`1.5px solid ${active?T.navy:'#E5E7EB'}`, background:active?T.navy:'white', color:active?'white':'#6B7280' }}>
                {p.label}
              </button>
            );
          })}
          {filterPersons.length>0&&<button onClick={()=>setFilterPersons([])} style={{ padding:'5px 12px', borderRadius:20, fontSize:11, cursor:'pointer', fontFamily:F.body, border:'1.5px solid #FCA5A5', background:'#FEF2F2', color:'#991B1B' }}>✕ Clear</button>}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ fontFamily:F.body, background:T.navy, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
        <div style={{ fontSize:28, fontWeight:400, color:T.white, fontFamily:F.heading, letterSpacing:'0.1em' }}>SALT</div>
        <div style={{ fontSize:11, color:T.gold, fontFamily:F.body, letterSpacing:'0.15em', textTransform:'uppercase' }}>Loading projects…</div>
        <div style={{ width:200, height:3, background:T.navy3, borderRadius:10, overflow:'hidden', marginTop:8 }}>
          <div style={{ height:'100%', width:'60%', background:T.gold, borderRadius:10, animation:'none' }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:F.body, background:T.bg, minHeight:'100vh' }}>

      {/* ── Nav bar ── */}
      <div style={{ background:T.navy, padding:'0 28px', display:'flex', alignItems:'center', borderBottom:`2px solid ${T.gold}`, boxShadow:'0 2px 20px rgba(10,15,46,0.4)' }}>
        <div onClick={goHome} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0', cursor:'pointer' }}>
          <img src={LOGO_URI} alt="SALT" style={{ width:44, height:44, objectFit:'contain', filter:'brightness(0) invert(1)' }} />
          <div>
            <div style={{ fontSize:16, fontWeight:400, color:T.white, letterSpacing:'0.15em', fontFamily:F.heading, lineHeight:1.1 }}>SALT</div>
            <div style={{ fontSize:8, color:T.gold, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:F.body, marginTop:1 }}>Development Projects</div>
          </div>
        </div>
        <div style={{ flex:1 }} />
        {[{k:'thisweek',l:'★  This Week'},{k:'projects',l:'All Projects'},{k:'dashboard',l:'👥  Dashboard'}].map(({k,l})=>(
          <button key={k} onClick={()=>{setPage(k);setActiveId(null);}}
            style={{ padding:'10px 18px', marginLeft:2, border:'none', background:'transparent', cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:F.body, letterSpacing:'0.02em', transition:'all 0.15s',
              borderBottom:page===k&&!activeId?`2px solid ${T.gold}`:'2px solid transparent',
              color:page===k&&!activeId?T.gold:'rgba(255,255,255,0.5)',
            }}>{l}</button>
        ))}
        <div style={{ width:1, height:24, background:'rgba(255,255,255,0.08)', margin:'0 16px' }} />
        <span style={{ fontSize:11, color:'rgba(255,255,255,0.25)', fontFamily:F.body }}>{today.toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short',year:'numeric'})}</span>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'28px 24px' }}>

        {/* ════ THIS WEEK ════ */}
        {page==='thisweek'&&!activeId&&(
          <>
            {/* Hero */}
            <div style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navy2} 100%)`, borderRadius:16, padding:'28px 32px', marginBottom:24, display:'flex', alignItems:'center', gap:4, flexWrap:'wrap', boxShadow:'0 8px 32px rgba(10,15,46,0.2)', border:`1px solid ${T.navy3}` }}>
              <div style={{ flex:1, minWidth:220 }}>
                <div style={{ fontSize:9, color:T.gold, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', marginBottom:6, fontFamily:F.body }}>Week in Focus</div>
                <div style={{ fontSize:22, fontWeight:400, color:T.white, marginBottom:3, fontFamily:F.heading, letterSpacing:'-0.01em' }}>{getWeekRange()}</div>
                <div style={{ fontSize:12, color:T.slateL, marginBottom:14, fontFamily:F.body }}>{done} of {total} actions completed</div>
                <div style={{ height:4, background:'rgba(255,255,255,0.08)', borderRadius:10, maxWidth:300, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${total?(done/total)*100:0}%`, background:`linear-gradient(90deg, ${T.gold}, #E8C46A)`, borderRadius:10, transition:'width 0.5s', boxShadow:`0 0 10px ${T.gold}66` }} />
                </div>
                <div style={{ marginTop:8, fontSize:10, color:'rgba(255,255,255,0.2)', fontFamily:F.body }}>Tasks auto-appear when due this week · Flag others with ★</div>
              </div>
              <div style={{ display:'flex', gap:0 }}>
                <StatPill label="Total"     value={total}     color={T.white}    filterId="All" />
                <StatPill label="High ⚠"   value={high}      color="#FCA5A5"    filterId="High" />
                <StatPill label="Done"      value={done}      color="#6EE7B7"    filterId="Done" />
                <StatPill label="Remaining" value={remaining} color={T.gold}     filterId="Remaining" />
              </div>
            </div>

            <FilterBar />

            {projects.map(p=>{
              const items=filtered.filter(i=>i.projectId===p.id);
              if(!items.length) return null;
              return (
                <div key={p.id} style={{ marginBottom:22 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:p.color, boxShadow:`0 0 6px ${p.color}` }} />
                    <button onClick={()=>openProject(p.id)} style={{ fontSize:11, fontWeight:700, color:p.color, textTransform:'uppercase', letterSpacing:'0.07em', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:F.body }}>{p.name}</button>
                    <span style={{ fontSize:11, color:T.slateL, fontFamily:F.body }}>{items.filter(i=>i.status==='Completed').length}/{items.length} done</span>
                    <div style={{ flex:1, height:1, background:'#ECEEF5' }} />
                    <button onClick={()=>openProject(p.id)} style={{ fontSize:11, color:T.gold, background:'none', border:'none', cursor:'pointer', fontWeight:600, fontFamily:F.body }}>Open Project →</button>
                  </div>
                  {items.map(item=>(
                    <WeekRow key={`${item.projectId}-${item.secId}-${item.cId}-${item.tId}`} item={item}
                      onToggleWeek={(pId,sId,cId,tId)=>gTog(pId,sId,cId,tId,'week')}
                      onToggleComplete={(pId,sId,cId,tId)=>gTog(pId,sId,cId,tId,'done')}
                      onOpen={openProject} />
                  ))}
                </div>
              );
            })}

            {filtered.length===0&&total>0&&(
              <div style={{ textAlign:'center', padding:'60px', color:T.slateL }}>
                <div style={{ fontSize:36, marginBottom:10 }}>🔍</div>
                <div style={{ fontSize:14, fontWeight:600, marginBottom:6, fontFamily:F.body }}>No items match your filter</div>
                <button onClick={()=>{setFilterStatus('All');setFilterPersons([]);setSearch('');}} style={{ fontSize:12, color:T.gold, background:'none', border:'none', cursor:'pointer', textDecoration:'underline', fontFamily:F.body }}>Clear all filters</button>
              </div>
            )}
            {total===0&&(
              <div style={{ textAlign:'center', padding:'80px', color:T.slateL }}>
                <div style={{ fontSize:40, marginBottom:12 }}>☆</div>
                <div style={{ fontSize:16, fontWeight:600, marginBottom:6, color:T.navy, fontFamily:F.heading }}>No actions this week</div>
                <div style={{ fontSize:12, fontFamily:F.body }}>Tasks with due dates this week appear automatically. Flag others with ★.</div>
              </div>
            )}
          </>
        )}

        {/* ════ ALL PROJECTS ════ */}
        {page==='projects'&&!activeId&&(
          <>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 style={{ margin:0, fontSize:24, color:T.navy, fontFamily:F.heading, fontWeight:400, letterSpacing:'-0.01em' }}>All Projects</h2>
              <button onClick={()=>setShowAdd(v=>!v)} style={{ ...btn('primary'), padding:'9px 20px', fontSize:13 }}>+ New Project</button>
            </div>

            {showAdd&&(
              <div style={{ background:'white', border:'1.5px solid #E5E7EB', borderRadius:12, padding:18, marginBottom:18, display:'flex', gap:10, flexWrap:'wrap', alignItems:'flex-end', boxShadow:'0 4px 16px rgba(10,15,46,0.08)' }}>
                <div style={{ flex:1, minWidth:200, display:'flex', flexDirection:'column', gap:5 }}>
                  <label style={{ fontSize:10, fontWeight:700, color:T.slate, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:F.body }}>Project Name</label>
                  <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Smith Road Coomera"
                    style={{ padding:'9px 14px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:13, outline:'none', fontFamily:F.body }} />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  <label style={{ fontSize:10, fontWeight:700, color:T.slate, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:F.body }}>Stage</label>
                  <select value={newStage} onChange={e=>setNewStage(e.target.value)} style={{ padding:'9px 14px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:13, outline:'none', fontFamily:F.body }}>
                    {STAGES.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <button onClick={addProject} style={{ ...btn('primary'), padding:'9px 20px', fontSize:13 }}>Add</button>
                <button onClick={()=>setShowAdd(false)} style={{ ...btn('ghost'), padding:'9px 16px', fontSize:13 }}>Cancel</button>
              </div>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:14 }}>
              {projects.map(p=><ProjectCard key={p.id} project={p} onOpen={openProject} />)}
            </div>
          </>
        )}

        {/* ════ DASHBOARD ════ */}
        {page==='dashboard'&&!activeId&&<Dashboard projects={projects} onOpen={openProject} />}

        {/* ════ SINGLE PROJECT ════ */}
        {page==='project'&&activeId&&activeProject&&(
          <>
            {/* Project header */}
            <div style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navy2} 100%)`, borderRadius:14, padding:'20px 26px', marginBottom:20, display:'flex', alignItems:'center', gap:14, boxShadow:'0 4px 20px rgba(10,15,46,0.15)', border:`1px solid ${T.navy3}` }}>
              <button onClick={goBack} style={{ ...btn('dark'), padding:'6px 14px', fontSize:12, background:'rgba(255,255,255,0.08)', border:`1px solid ${T.navy4}`, color:T.slateL }}>← Back</button>
              <div style={{ width:1, height:24, background:T.navy4 }} />
              <div style={{ width:12, height:12, borderRadius:'50%', background:activeProject.color, boxShadow:`0 0 8px ${activeProject.color}` }} />
              <div>
                <h2 style={{ margin:0, fontSize:20, color:T.white, fontFamily:F.heading, fontWeight:400, letterSpacing:'-0.01em', lineHeight:1.2 }}>{activeProject.name}</h2>
                {(activeProject.purchaseDate||activeProject.settlementDate)&&(
                  <div style={{ fontSize:11, color:T.slateL, marginTop:3, fontFamily:F.body }}>
                    {activeProject.purchaseDate&&`📅 Purchased: ${fmtDate(activeProject.purchaseDate)}`}{activeProject.purchaseDate&&activeProject.settlementDate&&'   ·   '}{activeProject.settlementDate&&`🏁 Settlement: ${fmtDate(activeProject.settlementDate)}`}
                  </div>
                )}
              </div>
              <span style={{ display:'inline-flex', padding:'4px 12px', borderRadius:20, fontSize:10, fontWeight:600, background:'rgba(201,168,76,0.15)', color:T.gold, fontFamily:F.body, letterSpacing:'0.03em' }}>{activeProject.stage}</span>
              <div style={{ flex:1 }} />
              <button onClick={()=>{const s={};SECTION_META.forEach(m=>{s[`${activeId}-${m.id}`]=true;});setCollapsed(s);}} style={{ ...btn('dark'), background:'rgba(255,255,255,0.06)', border:`1px solid ${T.navy4}`, color:T.slateL, fontSize:11 }}>Collapse All</button>
              <button onClick={()=>setCollapsed({})} style={{ ...btn('dark'), background:'rgba(255,255,255,0.06)', border:`1px solid ${T.navy4}`, color:T.slateL, fontSize:11 }}>Expand All</button>
            </div>

            {/* Milestone Timeline */}
            <MilestoneTimeline
              milestones={activeProject.milestones || initMilestones(activeProject)}
              onUpdate={updated => updMilestone(updated.id, updated)}
              onAdd={ms => addMilestone(ms)}
              onDelete={msId => delMilestone(msId)}
            />

            {SECTION_META.map(sec=>(
              <SectionBlock key={sec.id} sec={sec}
                consultants={activeProject.sections[sec.id]||[]}
                purchaseDate={activeProject.purchaseDate} settlementDate={activeProject.settlementDate}
                onUpdateC={(sId,cId,u)=>updC(sId,cId,u)} onAddC={()=>addC(sec.id)} onDeleteC={(sId,cId)=>delC(sId,cId)}
                onAddTask={(sId,cId,td)=>addT(sId,cId,td)} onUpdateTask={(sId,cId,tId,u)=>updT(sId,cId,tId,u)} onDeleteTask={(sId,cId,tId)=>delT(sId,cId,tId)}
                onToggleWeek={(sId,cId,tId)=>togW(sId,cId,tId)} onToggleComplete={(sId,cId,tId)=>togC(sId,cId,tId)}
                collapsed={!!collapsed[`${activeId}-${sec.id}`]} onToggleCollapse={()=>setCollapsed(s=>({...s,[`${activeId}-${sec.id}`]:!s[`${activeId}-${sec.id}`]}))} />
            ))}
          </>
        )}

      </div>
    </div>
  );
}
