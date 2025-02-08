const rewardBtn = document.getElementById('rewardBtn');
const rewardImgContainer = document.getElementById('rewardImgContainer');
var askRewardText = document.getElementById('askRewardText');

const rewardedText = `“你的鼓励就是我持续更新的动力
<br>
祝你一路无 Error，编译见 Success，事事顺心哦 ψ(｀∇´)ψ”`;
const befRewarded = `觉得不错的话，给点打赏吧 (✿◕‿◕✿)`;

if(rewardBtn){
	rewardBtn.onclick = () => {
		rewardImgContainer.style.display = (rewardImgContainer.style.display === 'none' || rewardImgContainer.style.display === '') ? 'inline-flex' : 'none'
		askRewardText.innerHTML = askRewardText.innerHTML === befRewarded ? rewardedText : befRewarded;
		setTimeout(() => {
			rewardImgContainer.style.opacity = (rewardImgContainer.style.opacity === '0' || rewardImgContainer.style.opacity === '') ? '1' : '0'
		}, 10);
	}
}