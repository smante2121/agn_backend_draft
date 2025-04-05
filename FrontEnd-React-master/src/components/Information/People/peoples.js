import Jef from '../Bio/square/JeffersonBoyd.jpg'
import Ch from '../Bio/square/ChrisWu.jpg'
import W from '../Bio/square/Wen.jpg'
import P from '../Bio/square/APeca.JPG'
import D from '../Bio/square/Dominic.png'
import N from '../Bio/square/Nico.jpg'
import S from '../Bio/square/Sicong.jpg'
import Ja from '../Bio/square/Jack.jpg'
import O from '../Bio/square/ogihara.jpg'
import G from '../Bio/square/giulia.jpg'
import Je from '../Bio/square/jerry.png'
import M from '../Bio/square/Meg_Urry.jpg'
import Y from '../Bio/square/Yasmeen_Asali.jpg'
import A from '../Bio/square/aritra_ghosh.JPG'

var Peoples = {
    Students:[
        {
            name: "Jefferson Boyd",
            title: "Software Engineer",
            description: "Jefferson is an undergraduate student at the Department of Computer Science, University of Miami. He created and refined front-end elements for the website.",
            link: Jef,
        },
        {
            name: "Christopher Wu",
            title: "Software Engineer",
            description: "Christopher is a Computer Science undergraduate student at the University of Miami, College of Arts & Sciences. Utilizing his expertise in full-stack development, Christopher focused on the fetching, processing, and rendering of response data from the back-end to enhance/refine components on the front-end of the website, expanding the scope of research capabilities for all-known AGNs and user concurrency across different machines.",
            link: Ch,
        },
        {
            name : "Wen Li",
            title: "Web designer & developer",
            description: "Wen Li is an undergraduate student at the Department of Physics, University of Miami. His undergraduate work focus on physics and computer science. In this program, Wen will be leading the effort to build the website both front-end and back-end.",
            link: W,
        },
        {
            name : "Alessandro Peca",
            title: "Catalog Lead Astrophysicist",
            description: " He is a graduate student at the Department of Physics, University of Miami. During his master's degree in Astrophysics and Cosmology, he acquired expertise in X-ray astrophysics, SED fitting, and multiwavelength AGN surveys. He is currently working on the X-ray AGN analysis of the Stripe-82X survey. He leads the Miami astronomy group in the building of AGNDB, working on the database assembling, source classification, counterparts association, and unit conversions.",
            link: P,
        },
        
        {
            name: "Dominic Sicilian",
            title: "Catalog Implementation",
            description:"Dominic is a graduate student in the Department of Physics. His research is in high-energy astrophysics, where his past & current work includes analyzing large data sets to study AGN X-ray spectra and investigate a dark matter candidate in the MIlky Way Halo. He joins the AGNDB science team, using his knowledge of astronomy to help guide the selection & synthesis of the database’s reference catalogs.",
            link: D
        },
        {
            name:"Jerry Bonnell",
            title:"Lead Software Engineer",
            description:"He is a graduate student in the Department of Computer Science. He has expertise in the tools and methods of Data Mining, Machine Learning (ML), and Natural Language Processing (NLP). He leads the Computer Science effort in building the AGNDB database and curating its data -- handling data redundancies, unit conversions, and missing values -- to ensure compliance with astronomical research, and enable downstream ML applications.",
            link: Je
        },
        {
            name:"John McKeown",
            title:"unknown",
            description:"John is a graduate student in the Department of Computer Science. He works alongside Jerry Bonnell to propose and implement machine learning and data analysis methods for research. He also works with Jerry and Sicong to develop internal tools for curating the data. His main research interests are theoretical machine learning and the application of machine learning to automated theorem proving.",
            link: Ja
        },
        {
            name: "Sicong Huang",
            title:"Astrophysicist Machine Learning Developer",
            description:"Sicong is a postdoc in the Department of physics, where his research includes data analysis and spectral fitting for cosmic X-ray background. As a founding member of AGNDB project, Sicong leads the team in the data collection and data clean stage. He also helps the team in data modeling, applying ML techniques, and exploratory analysis with AGNDB, where he uses his knowledge in astrophysics and data science to help collaborate between the Physics Department and the Computer Science Department",
            link:S
        },
        {
            name:"Giulia Cerini",
            title:"Catalog implementation",
            description:" She is a graduate student at the Department of Physics, University of Miami. During her Master’s Degree in Astronomy and Astrophysics, she acquired expertise in elaborating models on the evolution of the first galaxies and supermassive black holes. She is also involved in the detection and study of the warm hot intergalactic medium. She gave her contribution in finding the appropriate strategy for AGNDB building, handling catalogues and data classification.",
            link: G
        },
        {
            name:"Yasmeen Asali",
            title:"Machine Learning Astrophysics tools investigator",
            description:"Yasmeen is an Astronomy Ph.D. student at Yale University. She is working on applying unsupervised machine learning methods to study how galaxies self organize in order to probe AGN subtypes and populations. Her past work focused on gravitational wave astrophysics.",
            link: Y
        },
        {
            name:"Aritra Ghosh",
            title:"Imaging Classification With Machine Learning",
            description:"  Aritra is a Ph.D. candidate in the Department of Astronomy at Yale University. Aritra's graduate work focuses on understanding the co-evolution of black holes and galaxies using machine learning algorithms on large datasets. Aritra will be leading the effort to use machine learning algorithms to study AGN host galaxies in AGNDB.",
            link: A
        }
    ],
    Professors:[
        {
            name:"Nico Cappelluti",
            title:"PI",
            description:"PI of AGNDB. He is an assistant Professor at the Physics department of University of Miami. He is interested in employing wide field multiwavelength surveys for finding observational proxies of the formation mechanisms of Super Massive Black holes in the Universe, determining the origin of Cosmic Backgrounds, studying Active Galactic Nuclei (AGN) clustering and investigate the nature of Dark Matter",
            link: N
        },
        {
            name: "Mitsunori Ogihara",
            title:"CO-PI",
            description:"He joined the University of Miami in 2007 as Professor in the Department of Computer Science and as Program Director of the Big Data Analytics & Data Mining Program within the Center for Computational Science. More recently, he served as Associate Dean for Digital Library Innovation in the College of Arts and Sciences. Dr. Ogihara obtained his PhD in Information Sciences from the Tokyo Institute of Technology in 1993. From 1994 to 2007, Dr. Ogihara was a Computer Science faculty member at the University of Rochester, where he was promoted to Associate Professor with tenure in 1998, and to full Professor in 2002. He also served as Chair of the Department from 1999 to 2007. His research interests are in data mining, information retrieval, network traffic data analysis, program behavior analysis, molecular computation, and music information retrieval. Dr. Ogihara is the author of three books: The Complexity Theory Companion, Music Data Mining, and Fundamentals of Java Programming, and the author of more than 200 research papers. He is currently serving as Editor-in-Chief for the Theory of Computing Systems Journal (Springer), and is on the editorial board for the International Journal of Foundations of Computer Science (World Scientific).",
            link: O
        },
        {
            name: "Meg Urry",
            title:"CO-PI",
            description:" Israel Munson Professor of Physics and Astronomy at Yale University, and Director of the Yale Center for Astronomy and Astrophysics, former Physics Department Chiar 2007-2013, led the American Astronomical Society 2013-2017. Her scientific research focuses on active galaxies, which host accreting supermassive black holes in their centers. She has published more than 330 refereed research articles, including one of the most highly cited review papers in astronomy. Recent work includes multiwavelength surveys to quantify black hole growth over the past 12 billion years, using galaxy morphology to assess the influence of mergers on galaxy evolution, using clustering analyses to assess the dependence of black hole growth on AGN properties, and measuring galaxy properties using machine learning. Professor Urry received her Ph.D. in 1984 from Johns Hopkins University and her B.S. in Physics and Mathematics in 1977 from Tufts University. She is a Fellow of the American Academy of Arts and Sciences, the American Association for the Advancement of Science, the American Astronomical Society, the American Physical Society, American Women in Science; received an honorary doctorate from Tufts University; and was awarded the American Astronomical Society’s Annie Jump Cannon and George van Biesbroeck prizes, and Yale University’s Howard R. Lamar award. Professor Urry is known for her efforts to increase the number of women and minorities in science, for which she won the 2015 Edward A. Bouchet Leadership Award from Yale University and the 2010 Women in Space Science Award from the Adler Planetarium. She is the founding Physics instructor for the Global Teaching Project, which provides advanced courses to promising high school students in under-served areas, beginning with a pilot program in rural Mississippi. She also writes about science for CNN.com.",
            link: M
        }
    ]

}

export default Peoples

