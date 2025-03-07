export default function PriceCard({ price }) {
    return (
      <div style={styles.card}>
        <h2 style={styles.title}>Current Price</h2>
        <p style={styles.price}>₹{price}</p>
      </div>
    );
  }
  
  const styles = {
    card: {
      backgroundColor: '#facc15', // Equivalent to Tailwind's yellow-400
      color: 'black',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      width: '256px',
      textAlign: 'center',
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
    },
    price: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginTop: '8px',
    }
  };
  