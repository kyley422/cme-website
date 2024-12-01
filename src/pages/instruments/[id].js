import { useRouter } from 'next/router';
import instruments from 'data/instruments';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

const InstrumentPage = ({ instrument }) => {
  if (!instrument) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <NavBar />
        <h1>{instrument.name}</h1>
        <img src={instrument.image} alt={instrument.name} />
        <p>{instrument.name}</p>
        <Footer />
    </div>
  );
};

export async function getStaticPaths() {
    const paths = instruments.map((instrument) => ({
        params: { id: instrument.id },
    }))

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const instrument = instruments.find((item) => item.id === params.id);

    return { props: { instrument } };
}

export default InstrumentPage;
