function status(request, response) {
  response.status(200).json({ são: "quase 5:00 da manhã" });
}

export default status;
