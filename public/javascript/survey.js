document.getElementById('submit-survey').addEventListener('click', async () => {
  const weightManagement = document.querySelector('input[name="weight_management"]:checked');
  const taste = document.getElementById('taste').value;
  const dishType = document.getElementById('dish_type').value;

  if (!weightManagement || !taste || !dishType) {
    alert("すべての質問に答えてください！");
    return;
  }

  const surveyData = {
    weight_management: weightManagement.value,
    taste,
    dish_type: dishType,
  };

  try {
    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surveyData),
    });

    if (response.ok) {
      alert("アンケートを送信しました！");
    } else {
      alert("エラーが発生しました。もう一度やり直してください。");
    }
  } catch (error) {
    console.error("エラー:", error);
    alert("エラーが発生しました。もう一度やり直してください。");
  }
});
