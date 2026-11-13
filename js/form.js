(function () {
  'use strict';

  var IG_URL = 'https://ig.me/m/sizotto.ink';
  var FLASHES = {
    'tigre': 'Tigre',
    'tucano': 'Tucano',
    'onca-e-pantera': 'Onça e pantera',
    'onca-coracoes': 'Onça com corações'
  };

  var form = document.getElementById('orcamento-form');
  if (!form) return;

  var panel = document.getElementById('resumo');
  var out = document.getElementById('resumo-texto');
  var statusEl = document.getElementById('resumo-status');
  var btnCopy = document.getElementById('btn-copiar');
  var btnEdit = document.getElementById('btn-editar');

  var el = {
    nome: document.getElementById('nome'),
    flash: document.getElementById('flash'),
    ideia: document.getElementById('ideia'),
    regiao: document.getElementById('regiao'),
    tamanho: document.getElementById('tamanho'),
    referencia: document.getElementById('referencia'),
    disponibilidade: document.getElementById('disponibilidade'),
    maior18: document.getElementById('maior18')
  };

  /* ---------- Flash vindo da URL (?flash=tigre) ---------- */
  try {
    var param = new URLSearchParams(window.location.search).get('flash');
    if (param && Object.prototype.hasOwnProperty.call(FLASHES, param)) {
      el.flash.value = param;
    }
  } catch (e) { /* navegador antigo: segue sem pré-preencher */ }

  function updateIdeiaHint() {
    var hint = document.getElementById('dica-ideia');
    hint.textContent = el.flash.value
      ? 'Opcional: conte se quer alguma alteração no flash (tamanho, detalhes, cor).'
      : 'Descreva o desenho, o estilo (fineline, blackwork...) e o significado, se tiver.';
    el.ideia.required = !el.flash.value;
  }
  updateIdeiaHint();
  el.flash.addEventListener('change', function () {
    updateIdeiaHint();
    setError('ideia', '');
  });

  /* ---------- Validação ---------- */
  function validUrl(v) {
    try {
      var u = new URL(v);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch (e) { return false; }
  }

  function parseSize(v) {
    return parseFloat(String(v).trim().replace(',', '.'));
  }

  var rules = {
    nome: function (v) { return v.length < 2 ? 'Informe seu nome.' : ''; },
    ideia: function (v) {
      if (el.flash.value) return '';
      return v.length < 10 ? 'Descreva sua ideia em pelo menos 10 caracteres.' : '';
    },
    regiao: function (v) { return v ? '' : 'Escolha a região do corpo.'; },
    tamanho: function (v) {
      var n = parseSize(v);
      return (!/^\d+([.,]\d+)?$/.test(v.trim()) || n < 1 || n > 100)
        ? 'Informe o tamanho em cm, entre 1 e 100.' : '';
    },
    referencia: function (v) {
      return (v === '' || validUrl(v)) ? '' : 'Cole um link válido, começando com http:// ou https://.';
    },
    disponibilidade: function (v) { return v.length < 3 ? 'Informe dias e horários que prefere.' : ''; },
    maior18: function () { return el.maior18.checked ? '' : 'O atendimento é somente para maiores de 18 anos.'; }
  };

  function setError(name, msg) {
    var box = document.getElementById('erro-' + name);
    if (box) box.textContent = msg;
    if (msg) el[name].setAttribute('aria-invalid', 'true');
    else el[name].removeAttribute('aria-invalid');
  }

  function validateField(name) {
    var value = el[name].type === 'checkbox' ? '' : el[name].value.trim();
    var msg = rules[name](value);
    setError(name, msg);
    return msg === '';
  }

  function validateAll() {
    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      if (!validateField(name) && !firstInvalid) firstInvalid = el[name];
    });
    return firstInvalid;
  }

  // Valida ao sair do campo e limpa o erro enquanto corrige
  Object.keys(rules).forEach(function (name) {
    var evt = el[name].type === 'checkbox' || el[name].tagName === 'SELECT' ? 'change' : 'blur';
    el[name].addEventListener(evt, function () { validateField(name); });
    el[name].addEventListener('input', function () {
      if (el[name].getAttribute('aria-invalid') === 'true') validateField(name);
    });
  });

  /* ---------- Resumo ---------- */
  function buildSummary() {
    var v = function (k) { return el[k].value.trim(); };
    var lines = ['Olá, Gabriela! Vim pelo site e gostaria de um orçamento.', ''];
    lines.push('Nome: ' + v('nome'));
    if (el.flash.value) lines.push('Flash escolhido: ' + FLASHES[el.flash.value]);
    if (v('ideia')) lines.push('Ideia: ' + v('ideia'));
    lines.push('Região do corpo: ' + v('regiao'));
    lines.push('Tamanho aproximado: ' + String(parseSize(v('tamanho'))).replace('.', ',') + ' cm');
    if (v('referencia')) lines.push('Referência: ' + v('referencia'));
    lines.push('Disponibilidade: ' + v('disponibilidade'));
    lines.push('Tenho 18 anos ou mais.');
    return lines.join('\n');
  }

  /* ---------- Copiar ---------- */
  function fallbackCopy() {
    out.focus();
    out.select();
    out.setSelectionRange(0, out.value.length);
    try { return document.execCommand('copy'); } catch (e) { return false; }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return fallbackCopy(); }
      );
    }
    return Promise.resolve(fallbackCopy());
  }

  function setStatus(copied, opened) {
    var parts = [];
    parts.push(copied
      ? 'Resumo copiado! Cole a mensagem na conversa com a Gabriela.'
      : 'Não consegui copiar automaticamente. Toque em "Copiar resumo" ou selecione o texto abaixo.');
    if (!opened) parts.push('Se o Instagram não abriu, toque em "Abrir Instagram".');
    statusEl.textContent = parts.join(' ');
  }

  /* ---------- Envio ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = validateAll();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    out.value = buildSummary();
    panel.hidden = false;
    statusEl.textContent = 'Copiando resumo...';

    // Tudo dentro do mesmo toque do usuário, para o navegador não bloquear
    var copying = copyText(out.value);
    var win = window.open(IG_URL, '_blank');
    if (win) win.opener = null;

    copying.then(function (copied) { setStatus(copied, !!win); });
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  btnCopy.addEventListener('click', function () {
    copyText(out.value).then(function (copied) {
      statusEl.textContent = copied
        ? 'Resumo copiado! Cole a mensagem na conversa com a Gabriela.'
        : 'Não consegui copiar automaticamente. Selecione o texto abaixo e copie.';
    });
  });

  btnEdit.addEventListener('click', function () {
    panel.hidden = true;
    el.nome.focus();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------- Agenda Cal.com (opcional) ---------- */
  var agenda = document.getElementById('agenda');
  var calUrl = agenda ? (agenda.getAttribute('data-cal-url') || '').trim() : '';
  if (agenda && /^https:\/\/([a-z0-9-]+\.)?cal\.com\//i.test(calUrl)) {
    var frame = document.createElement('iframe');
    frame.className = 'agenda__frame';
    frame.src = calUrl;
    frame.title = 'Agenda de horários da Sizotto INK';
    frame.loading = 'lazy';
    agenda.textContent = '';
    agenda.appendChild(frame);
  }
})();



