import ServiceSeoPage from '../components/ServiceSeoPage'

function MassageTherapeutic() {
  return (
    <ServiceSeoPage
      label="MASAJ TERAPEUTIC"
      title="Masaj terapeutic în Chișinău pentru relaxare și recuperare"
      description="Masajul terapeutic este recomandat pentru reducerea tensiunii musculare, ameliorarea disconfortului și susținerea procesului de recuperare."
      canonical="/masaj-terapeutic-chisinau"
      benefits={[
        'Reducerea tensiunii musculare',
        'Ameliorarea durerilor musculare',
        'Îmbunătățirea mobilității',
        'Susținerea recuperării fizice',
        'Relaxare și reducerea stresului',
      ]}
    />
  )
}

export default MassageTherapeutic