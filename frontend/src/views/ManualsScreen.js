import '../manuals.css';
import ManualItem from '../components/ManualItem';
// Richards Code
function ManualsScreen() {
    return (
        <main className='manuals-container'>
            <h1>Need help with your game?</h1>
            <p>Sometimes sellers don't include the manuals, or the games themselves don't feature one.</p>
            <p>But don't worry, we've collected resources for all the games listed on our site.</p>
            <div className='manuals-listing'>
                <ManualItem title='Exploding Kittens' website='https://www.explodingkittens.com/' fileLink='https://dumekj556jp75.cloudfront.net/exploding-kittens/English.pdf' />
                <ManualItem title='Herd Mentality' website='https://www.whitcoulls.co.nz/product/herd-mentality-game-6604480' fileLink='https://www.youtube.com/watch?v=_rxOJ7Gt3FY&ab_channel=BigPotatoGames' />
                <ManualItem title='Lord of the Rings' website='https://www.fantasyflightgames.com/en/products/the-lord-of-the-rings-journeys-in-middle-earth/' fileLink='https://images-cdn.fantasyflightgames.com/filer_public/74/c1/74c1ee20-a2d2-407f-93da-e6c2a4b25529/journeys_in_middle-earth_learn_to_play.pdf' />
                <ManualItem title='Monopoly Classic' website='https://monopoly.hasbro.com/en-au' fileLink='https://www.hasbro.com/common/instruct/00009.pdf' />
            </div>
        </main>
    );
}

export default ManualsScreen;