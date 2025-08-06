import image1 from "@/assets/tinubu.jpg"
import image2 from "@/assets/atiku.jpg"
import image3 from "@/assets/peter.jpg"
import partyImg from "@/assets/apc.jpg"
import partyImg2 from "@/assets/pdp.jpg"
import partyImg3 from "@/assets/labor.jpg"

export const electoralCandidates =[
    {
        id:1,
        name:"Bola Tinubu",
        image:image1,
        party:partyImg,
        partyName:"APC",
        desc:`Asiwaju Bola Ahmed Adekunle Tinubu GCFR (born 29 March 1952) is a Nigerian politician who is serving as the 16th and current president of Nigeria since 2023. 
        [1] He previously served as the governor of Lagos State from 1999 to 2007, and senator for Lagos West in the Third Republic.`
    },
    {
        id:2,
        name:"Atiku Abubakar",
        image:image2,
        party:partyImg2,
        partyName:"PDP",
        desc:`Atiku Abubakar, GCON is a Nigerian politician, 2019 presidential candidate, businessman, and philanthropist, who served as the second elected vice-president of Nigeria from 1999 to 2007, 
        on the platform of the People's Democratic Party, with President Olusegun Obasanjo. He is the presidential candidate for the Peoples Democratic Party (PDP) for the 2023 election`
    },
    {
        id:3,
        name:"Peter Obi",
        image:image3,
        party:partyImg3,
        partyName:"LP",
        desc:`Asiwaju Bola Ahmed Adekunle Tinubu GCFR (born 29 March 1952) is a Nigerian politician who is serving as the 16th and current president of Nigeria since 2023. 
        [1] He previously served as the governor of Lagos State from 1999 to 2007, and senator for Lagos West in the Third Republic.`
    },
]

type Users = {
  id: string
  name: string
  email: string
  state: string
  status: "pending" | "processing" | "success" | "failed"
}

export const usersData:Users[] =[
    {
        id:"1",
        name:"Enoch",
        email: "oyedejienoch@gmail.com",
        state:"Oyo",
        status:"processing"
    },
    {
        id:"2",
        name:"David",
        email: "david@gmail.com",
        state:"Lagos",
        status:"success"
    },
    {
        id:"3",
        name:"Susan",
        email: "rose@gmail.com",
        state:"Lagos",
        status:"processing"
    },
    {
        id:"4",
        name:"Emmanuel",
        email: "emma@gmail.com",
        state:"Oyo",
        status:"processing"
    },
    {
        id:"5",
        name:"Emmanuel",
        email: "emma@gmail.com",
        state:"Oyo",
        status:"processing"
    },
    {
        id:"6",
        name:"Emmanuel",
        email: "emma@gmail.com",
        state:"Oyo",
        status:"processing"
    },
    {
        id:"7",
        name:"Emmanuel",
        email: "emma@gmail.com",
        state:"Oyo",
        status:"processing"
    },
    {
        id:"8",
        name:"Emmanuel",
        email: "emma@gmail.com",
        state:"Oyo",
        status:"processing"
    },
]


export const nigerStates =[
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
]
