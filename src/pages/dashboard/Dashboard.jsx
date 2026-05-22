import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import DashboardView from './views/DashboardView'
import OCView from './views/OCView'
import TrazabilidadView from './views/TrazabilidadView'
import CatalogoView from './views/CatalogoView'
import PreciosView from './views/PreciosView'
import DevolucionView from './views/DevolucionView'
import FinancieroView from './views/FinancieroView'
import ReportesView from './views/ReportesView'
import NuevaOCView from './views/NuevaOCView'
import AyudaView from './views/AyudaView'
import DespachoView from './views/DespachoView'
import ReciboView from './views/ReciboView'

export default function Dashboard() {
  const [role, setRole] = useState('prov')
  const [view, setView] = useState('dashboard')

  const renderView = () => {
    switch(view) {
      case 'dashboard':    return <DashboardView role={role} setView={setView} />
      case 'oc':           return <OCView setView={setView} />
      case 'trazabilidad': return <TrazabilidadView />
      case 'catalogo':     return <CatalogoView />
      case 'precios':      return <PreciosView />
      case 'devolucion':   return <DevolucionView />
      case 'financiero':   return <FinancieroView />
      case 'reportes':     return <ReportesView />
      case 'nueva-oc':     return <NuevaOCView />
      case 'mis-ocs':      return <OCView setView={setView} />
      case 'recepciones':  return <ReciboView />
      case 'mis-facturas': return <FinancieroView />
      case 'ayuda':        return <AyudaView />
      case 'despacho':     return <DespachoView />
      case 'recibo':       return <ReciboView />
      default: return (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 900, color: '#0B1F3A', marginBottom: '8px' }}>
            Modulo: <span style={{ color: '#00C2A8' }}>{view}</span>
          </div>
          <div style={{ color: '#6B8BAE', fontSize: '13px' }}>En construccion...</div>
        </div>
      )
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F0F7FF', fontFamily: "'DM Sans', sans-serif" }}>
      <Sidebar role={role} setRole={setRole} view={view} setView={setView} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar role={role} view={view} setView={setView} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {renderView()}
        </main>
      </div>
    </div>
  )
}
