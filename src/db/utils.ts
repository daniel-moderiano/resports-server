import db from ".";

(async () => {
  try {
    console.log('Connecting...');

    await db.connect();
    console.log('Connected');

  } catch (error) {
    console.log(error);

  }
})();