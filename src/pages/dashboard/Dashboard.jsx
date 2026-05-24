import { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { useTour } from '../../hooks/useTour'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { setSearchQuery } = useApp()
  const { startTour, isTourDone } = useTour(role)
  const tourStarted = useRef(false)

  useEffect(() => {
    setSearchQuery('')
  }, [view])

  useEffect(() => {
    if (!tourStarted.current && !isTourDone()) {
      tourStarted.current = true
      setTimeout(() => startTour(), 800)
    }
  }, [role])

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'o' || e.key === 'O') setView('nueva-oc')
      if (e.key === 's' || e.key === 'S') setView('catalogo')
      if (e.key === 'l' || e.key === 'L') setView('precios')
      if (e.key === 'd' || e.key === 'D') setView('devolucion')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const renderView = () => {
    switch(view) {
      case 'dashboard':    return <DashboardView role={role} setView={setView} />
      case 'oc':           return <OCView setView={setView} role={role} />
      case 'trazabilidad': return <TrazabilidadView />
      case 'catalogo':     return <CatalogoView />
      case 'precios':      return <PreciosView />
      case 'devolucion':   return <DevolucionView />
      case 'financiero':   return <FinancieroView />
      case 'reportes':     return <ReportesView />
      case 'nueva-oc':     return <NuevaOCView />
      case 'mis-ocs':      return <OCView setView={setView} role={role} />
      case 'recepciones':  return <ReciboView />
      case 'mis-facturas': return <FinancieroView />
      case 'ayuda':        return <AyudaView />
      case 'despacho':     return <DespachoView />
      case 'recibo':       return <ReciboView />
      default: return (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 900, color: '#0B1F3A', marginBottom: '8px' }}>
            <span style={{ color: '#00F5A0' }}>{view}</span>
          </div>
          <div style={{ color: '#6B8BAE', fontSize: '13px' }}>En construccion...</div>
        </div>
      )
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F0F7FF', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}>
      <Sidebar
        role={role} setRole={setRole}
        view={view} setView={setView}
        open={sidebarOpen} setOpen={setSidebarOpen}
        onTour={startTour}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar
          role={role} view={view} setView={setView}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {renderView()}
        </main>
      </div>
    </div>
  )
}
