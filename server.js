const express=require("express");
const cors=require("cors");
const app=express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

const links={};

app.post("/create",(req,res)=>{
  const token=Math.random().toString(36).slice(2);
  links[token]={used:false,name:req.body.name};
  res.json({token});
});

app.get("/validate/:token",(req,res)=>{
  const l=links[req.params.token];
  if(!l||l.used) return res.json({valid:false});
  res.json({valid:true,name:l.name});
});

app.get("/use/:token",(req,res)=>{
  if(links[req.params.token]) links[req.params.token].used=true;
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running"));

