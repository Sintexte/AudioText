let WebsiteNameen="Speech Converter"
let WebsiteNamefr="Parole Text"

export const Language ={
    en:  {
        WebsiteName:WebsiteNameen,
        Home:{
            WebsiteName:WebsiteNameen,
            SmallTitle:'Use Your Voice',
            cnxbtn:'Connect',
        },
        LoginForm:{
            logtitle:"Login",
            userindefault:"Enter your Username",
            passwordindefault:"Enter your Password",
            logbtn:"Log in"
        },
        SignupForm:{
            signtitle:"Signup",
            userindefault:"Enter your Username",
            passwordindefault:"Enter your Password",
            passwordin_default:"Enter your Password Again",
            mailindefaul:'Enter your Email',
            signbtn:"Sign up"
        },
        Main:{
            WebsiteName:WebsiteNameen,
            title:"Upload your 🎵.mp3 file",
            fileindefault:"Choose File",
            btnbrowse:"Browse",
            btnupload:"Upload",
            header:{
                WebsiteName:WebsiteNamefr,
                btnlogoff: 'Se Déconnecter',
                btnuser: 'User',
            },
            transcript:{
                title: "Transcript of your Audio File 🎵",
                btnback: "Go Back"
            },
            Record:{
                title:'Enregister votre propre Audio 🎵'
            }
        }
    },
    fr:  {
        WebsiteName:WebsiteNamefr,
        Home:{
            WebsiteName:WebsiteNamefr,
            SmallTitle:'Utuliser Votre voix',
            cnxbtn:'Se Connecter',
        },
        LoginForm:{
            logtitle:"connecter",
            userindefault:"Entrer votre Nom d'utilisateur",
            passwordindefault:"Entrer votre Mot de Passe",
            logbtn:"Se Connecter"
        },
        SignupForm:{
            signtitle:"Signup",
            userindefault:"Entrer votre Nom d'utilisateur",
            passwordindefault:"Entrer votre Mot de Passe",
            passwordin_default:"Entrer votre Mot de Passe *",
            mailindefaul:'Entrer votre Email',
            signbtn:"S'inscrire"
        },
        Main:{
            WebsiteName:WebsiteNamefr,
            title:"Téléchargez votre 🎵.mp3 fichier",
            fileindefault:"Choisir le fichier",
            btnbrowse:"Parcourir",
            btnupload:"Télécharger",
            header:{
                WebsiteName:WebsiteNamefr,
                btnlogoff: 'Se Déconnecter',
                btnuser: 'Utulisateur',
            },
            transcript:{
                title: "Transcription de votre fichier audio 🎵",
                btnback: "Retourner"
            },
            Record:{
                title:'Enregister votre propre Audio 🎵'
            }
        }
    }
}

export const SupportedLanguages = ["fr","en"]
