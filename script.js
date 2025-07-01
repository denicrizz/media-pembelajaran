document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  const target = document.getElementById("target");
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("toggle-music");

  let isPlaying = false;

  toggleBtn.addEventListener("click", () => {
    if (!isPlaying) {
      music.play();
      toggleBtn.textContent = "Matikan Musik";
    } else {
      music.pause();
      toggleBtn.textContent = "Nyalakan Musik";
    }
    isPlaying = !isPlaying;
  });

  items.forEach(item => {
    item.addEventListener("dragstart", dragStart);
  });

  target.addEventListener("dragover", dragOver);
  target.addEventListener("drop", drop);

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggable = document.getElementById(id);
    if (!target.contains(draggable)) {
      target.appendChild(draggable);
    }
  }

  window.cekJawaban = function () {
    const correctOrder = ["penguapan", "kondensasi", "presipitasi", "infiltrasi"];
    const droppedItems = Array.from(target.querySelectorAll(".item")).map(item => item.id);

    if (JSON.stringify(droppedItems) === JSON.stringify(correctOrder)) {
      document.getElementById("result").textContent = "Benar! Anda berhasil menyusun siklus air dengan tepat!";
    } else {
      document.getElementById("result").textContent = "Ups! Urutan masih salah. Coba lagi ya.";
    }
  };
});
