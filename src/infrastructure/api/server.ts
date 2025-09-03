import { app } from "./express";

const port: number = Number(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
