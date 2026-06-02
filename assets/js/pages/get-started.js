(function () {
  var currentStep = 1;
  var totalSteps  = 5;
  var flow        = 'patient'; // 'patient' or 'other'
  var selections  = {};

  var segs     = document.querySelectorAll('.gs-progress__seg');
  var label    = document.getElementById('gs-step-label');
  var nextBtn  = document.getElementById('gs-next');
  var nextCirc = document.getElementById('gs-next-arrow');
  var backBtn  = document.getElementById('gs-back');

  var checkedSVG   = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="5" fill="#3b2fe0" fill-opacity="0.18"/><path d="M5 10.5L8.5 14L15 7" stroke="#3b2fe0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var uncheckedSVG = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="4" stroke="#c5bfe8" stroke-width="1.5"/></svg>';

  function getActiveFlow() {
    return flow === 'patient' ? 'patient' : 'other';
  }

  function getStepEl(step) {
    if (step === 1) return document.querySelector('.gs-step[data-step="1"]');
    return document.querySelector('.gs-step[data-step="' + step + '"][data-flow="' + getActiveFlow() + '"]');
  }

  function setButtonActive(active) {
    nextBtn.classList.toggle('is-active', active);
    nextCirc.classList.toggle('is-active', active);
  }

  function updateProgress() {
    segs.forEach(function (seg, i) {
      seg.classList.toggle('is-done', i < currentStep);
    });
    label.textContent = currentStep + '/' + totalSteps;
    backBtn.classList.toggle('is-visible', currentStep > 1);

    if (currentStep === totalSteps) {
      nextBtn.textContent  = flow === 'patient' ? 'Schedule a Demo' : 'Partner With Us';
      nextCirc.textContent = '→';
      setButtonActive(true);
    } else {
      nextBtn.textContent = 'Next';
      nextCirc.innerHTML  = '&#8594;';
      setButtonActive(!!selections[currentStep]);
    }
  }

  function goToStep(step) {
    document.querySelectorAll('.gs-step').forEach(function (s) {
      s.classList.remove('is-active');
    });
    var target = getStepEl(step);
    if (target) target.classList.add('is-active');
    currentStep = step;
    updateProgress();
  }

  function handleOptionClick() {
    var stepEl = this.closest('.gs-step');
    if (!stepEl) return;

    stepEl.querySelectorAll('.gs-option').forEach(function (opt) {
      opt.classList.remove('gs-option--selected');
      var chk = opt.querySelector('.gs-option__check');
      if (chk) chk.innerHTML = uncheckedSVG;
    });

    this.classList.add('gs-option--selected');
    var chk = this.querySelector('.gs-option__check');
    if (chk) chk.innerHTML = checkedSVG;

    var val = this.getAttribute('data-value');

    if (currentStep === 1) {
      flow = (val === 'patient') ? 'patient' : 'other';
    }

    selections[currentStep] = val;
    setButtonActive(true);
  }

  function handleNext() {
    if (currentStep === totalSteps) {
      var activeStep = getStepEl(totalSteps);
      if (activeStep) {
        var inputs = activeStep.querySelectorAll('.gs-input');
        var labels = activeStep.querySelectorAll('.gs-label');
        for (var i = 0; i < inputs.length; i++) {
          var lbl = labels[i] ? labels[i].textContent : '';
          if (lbl.indexOf('*') !== -1 && !inputs[i].value.trim()) {
            inputs[i].focus();
            return;
          }
        }
      }
      window.location.href = '../index.html';
      return;
    }
    goToStep(currentStep + 1);
  }

  document.querySelectorAll('.gs-option').forEach(function (opt) {
    opt.addEventListener('click', handleOptionClick);
  });

  if (nextBtn)  nextBtn.addEventListener('click', handleNext);
  if (nextCirc) nextCirc.addEventListener('click', handleNext);
  if (backBtn)  backBtn.addEventListener('click', function () {
    if (currentStep > 1) goToStep(currentStep - 1);
  });

  selections[1] = 'patient';
  updateProgress();
})();
