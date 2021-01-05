(() => {
  const $select = document.querySelector('[name="genre"]');
  $select.onchange = (e) => { 
    const $a = document.getElementById('js-link');
    $a.href = `/?genre=${$select.value}`;
  };
})();