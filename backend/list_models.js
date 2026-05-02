const listModels = async () => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyD9oTweGDFw3gHyEwIKZcdazlNWd5tiPRQ`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e.message);
  }
};
listModels();
