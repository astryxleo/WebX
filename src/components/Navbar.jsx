import { useEffect, useState } from 'react'
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react'

export default function Navbar() {
  const [muted, setMuted] = useState(true)
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata', hour12: false }).format(new Date()))
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [])
  return <header className="navbar">
    <a className="brand" href="#top" aria-label="WebX home">WEBX<span>®</span></a>
    <nav className="nav-links" aria-label="Main navigation">
      <a href="#work">WORK <span>01</span></a><a href="#about">ABOUT <span>02</span></a><a href="#approach">APPROACH <span>03</span></a>
    </nav>
    <div className="nav-right"><span className="local-time"><i /> IST&nbsp; {time}</span><button className="sound-toggle" onClick={() => setMuted(!muted)} aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'} title="Sound effects are visual-only in this demo">{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}<span>{muted ? 'SOUND OFF' : 'SOUND ON'}</span></button><a className="contact-pill" href="#contact">LET’S TALK <ArrowUpRight size={14} /></a></div>
  </header>
}