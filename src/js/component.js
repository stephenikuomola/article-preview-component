class ArticleComponent {
	#parentElement = document.querySelector("div[class='share']"); 
	
	constructor() {
		this.#parentElement.addEventListener('click', this.#toggleBtn)
	}

	#toggleBtn(evtObj) {
    const previewBtn = evtObj.target.closest(".button-share"); 

    if(!previewBtn) return; 

    const isOpen= previewBtn.getAttribute('aria-expanded') === "true" || false; 

    previewBtn.setAttribute('aria-expanded', `${!isOpen}`);

    isOpen ? previewBtn.nextElementSibling.classList.remove('active') :  previewBtn.nextElementSibling.classList.add('active'); 
  }
}


new ArticleComponent(); 

