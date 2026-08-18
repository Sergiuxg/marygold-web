import ServiceSeoPage from '../components/ServiceSeoPage'

function MassageClassic() {
  return (
    <ServiceSeoPage
      label="MASAJ CLASIC"
      title="Masaj clasic în Chișinău pentru relaxare și revigorare"
      description="Masajul clasic ajută la relaxarea musculaturii, reducerea stresului și îmbunătățirea stării generale de bine."
      canonical="/masaj-clasic-chisinau"
      benefits={[
        'Relaxare musculară',
        'Reducerea stresului',
        'Stimularea circulației',
        'Revigorarea corpului',
        'Stare generală de bine',
      ]}
    />
  )
}

export default MassageClassic