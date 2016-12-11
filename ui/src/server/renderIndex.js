const renderIndex = (html, css, assetMap, store) => `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,
    initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>
    
    <title>inskop.io</title>
    
    <style data-aphrodite>${css.content}</style>
    <link href='https://fonts.googleapis.com/css?family=Asap:400,700' rel='stylesheet'>

  </head>
  <body>
    <div id='mount'>${html}</div>
    <script>
      window.INITIAL_STATE = ${JSON.stringify(store.getState())}
    </script>
    <script src='${assetMap.javascript.bundle}'></script>
  </body>
</html>
`;

export default renderIndex;
