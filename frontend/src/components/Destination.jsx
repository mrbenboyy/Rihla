import DestinationData from "./DestinationData";
import "./DestinationStyles.css"
import City1 from '../assets/images/chefchaouen.jpg';
import City2 from '../assets/images/chefchaouen2.jpg';
import City3 from '../assets/images/essaouira.jpg';
import City4 from '../assets/images/essaouira2.jpg';


const Destination = ()=>{
    return (
        <div className="destination">
            <h1>Destinations Populaires</h1>
            <DestinationData 
            heading="Chefchaouen" 
            text="Chefchaouen, ou Chaouen, est une ville située dans les montagnes du Rif, au nord-ouest du Maroc. Elle est réputée pour les bâtiments remarquables de différents tons de bleu délavé de sa vieille ville. Des ateliers de maroquinerie et de tissage bordent ses allées pavées abruptes. Sur la place centrale ombragée d'Outa el Hammam se trouve la casbah aux murs rouges, forteresse et donjon du XVe siècle avec expositions ethnographiques et artistiques. Le minaret octogonal de la Grande Mosquée s'élève non loin de là." 
            img1={City1} 
            img2={City2} 
            className="first-des" />
            <DestinationData 
            heading="Essaouira" 
            text="Essaouira est une ville portuaire et touristique située sur la côte atlantique du Maroc. En bord de mer, sa médina (vieille ville) est protégée par des remparts du XVIIIe siècle, appelés la Skala de la Kasbah et imaginés par des ingénieurs européens. Parsemées d'anciens canons en cuivre, les fortifications offrent une vue sur l'océan. Avec leurs alizés puissants, les plages de la ville sont idéales pour surfer, faire de la planche à voile et du kitesurf." 
            img1={City3} 
            img2={City4} 
            className="first-des-reverse" />
         </div>
    )
};

export default Destination