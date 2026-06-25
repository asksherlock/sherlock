import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const DashboardStats: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  
  const { totalDocs: totalPosts } = await payload.find({ collection: 'posts', limit: 1 })
  const { totalDocs: totalTestimonials } = await payload.find({ collection: 'testimonials', limit: 1 })
  const { totalDocs: totalUsers } = await payload.find({ collection: 'users', limit: 1 })

  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>Resumen General</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        {/* Card 1 */}
        <div style={{ 
          background: '#111', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          borderTop: '2px solid #7c3aed',
          boxShadow: '0 -4px 15px rgba(124, 58, 237, 0.15)'
        }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1px', marginBottom: '0.75rem', fontWeight: '600' }}>ARTÍCULOS (BLOG)</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{totalPosts}</div>
        </div>

        {/* Card 2 */}
        <div style={{ 
          background: '#111', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          borderTop: '2px solid #7c3aed',
          boxShadow: '0 -4px 15px rgba(124, 58, 237, 0.15)'
        }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1px', marginBottom: '0.75rem', fontWeight: '600' }}>TESTIMONIOS</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{totalTestimonials}</div>
        </div>

        {/* Card 3 */}
        <div style={{ 
          background: '#111', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          borderTop: '2px solid #7c3aed',
          boxShadow: '0 -4px 15px rgba(124, 58, 237, 0.15)'
        }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1px', marginBottom: '0.75rem', fontWeight: '600' }}>USUARIOS</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{totalUsers}</div>
        </div>

        {/* Card 4 */}
        <div style={{ 
          background: '#111', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          borderTop: '2px solid #7c3aed',
          boxShadow: '0 -4px 15px rgba(124, 58, 237, 0.15)'
        }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1px', marginBottom: '0.75rem', fontWeight: '600' }}>ESTADO DEL SISTEMA</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.5rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }}></span>
            Óptimo
          </div>
        </div>

      </div>
    </div>
  )
}
