const express = require("express");
const app = express();

// Servir frontend
app.use(express.static("public"));

// Estado da máquina
let maquina = {
  temperatura: 65,
  energia: 110,
  status: "Ligada"
};

// Simulação dinâmica REALISTA
setInterval(() => {
  if (maquina.status === "Ligada") {
    maquina.temperatura += Math.random() * 3 - 1.5;
    maquina.energia += Math.random() * 8 - 4;
  } else {
    // Máquina desligada
    maquina.energia = 0;

    // Resfriamento gradual até temperatura ambiente
    if (maquina.temperatura > 25) {
      maquina.temperatura -= 0.5;
    }
  }

  // Limites físicos
  if (maquina.temperatura < 25) maquina.temperatura = 25;
  if (maquina.energia < 0) maquina.energia = 0;

}, 1500);

// Rota de dados
app.get("/dados", (req, res) => {
  res.json(maquina);
});

// Controle da máquina
app.get("/controle/:acao", (req, res) => {
  const acao = req.params.acao;

  if (acao === "desligar") {
    maquina.status = "Desligada";
  }

  if (acao === "ligar") {
    maquina.status = "Ligada";
  }

  if (acao === "resfriar") {
    maquina.temperatura -= 10;
  }

  res.json({ ok: true, acao });
});

// Servidor
app.listen(3000, () => {
  console.log("🔥 Rodando em http://localhost:3000");
});