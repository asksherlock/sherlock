import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H16V2H20V6H24V2H28V0H40V6H38V10H36V12H32V14H28V16H24V14H20V16H16V14H12V16H8V14H4V12H2V10H0V0Z" fill="#7c3aed" />
        <path d="M4 2H6V4H8V6H6V8H4V6H2V4H4V2ZM26 2H28V4H30V6H28V8H26V6H24V4H26V2Z" fill="white" />
      </svg>
      <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#7c3aed', letterSpacing: '-0.025em' }}>Ask Sherlock</span>
    </div>
  )
}
