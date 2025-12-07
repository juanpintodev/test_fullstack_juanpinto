import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#1976d2',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
      }}>
        Go back to the home page
      </Link>
    </div>
  )
} 