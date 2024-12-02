import { useRouter } from 'next/router';
import instruments from 'data/instruments';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import InstrumentHeader from 'components/InstrumentHeader';
import { Box, Divider } from '@chakra-ui/react';
import PlayerDirectory from 'components/PlayerDirectory';
import players from 'data/players';

const InstrumentPage = ({ instrument }) => {
  if (!instrument) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Box bgColor="black" overflowX="hidden" overflowY="hidden">
            <NavBar />
            <InstrumentHeader instrument={instrument}/>
            <Divider borderColor="gray.100" borderWidth="1px" my="9px" bgColor="black" mx="auto" width="full"/>
            <PlayerDirectory players={players.filter((player) => { return instrument.players.includes(player.name); })}/>
            <Footer />
        </Box>
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
