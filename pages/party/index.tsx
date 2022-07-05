import classNames from "classnames"
import { useRef, useState } from "react"

import ThemeTransition from "@/common/theme-transition"
import { useTimeoutEffect } from "@/common/timeout"
import Balloon, { AllBalloonNumbers } from "@/components/party/balloon.component"
import BirthdayAudio from "@/components/party/birthday-audio.component"
import Bulbs from "@/components/party/bulbs.component"
import Button from "@/components/party/button.component"
import { withDefaultAuthentication } from "@/features/authentication/authentication.hook"
import BaseLayout from "@/layouts/base/base.layout"

function PartyPage() {
	const audioRef = useRef<HTMLAudioElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const messageRef = useRef<HTMLDivElement>(null)

	const [theme, setTheme] = useState<string>(ThemeTransition.from)
	const [songPlaying, setSongPlaying] = useState<boolean>(false)
	const [songLoop, setSongLoop] = useState<boolean>(true)
	const [bulbsShown, setBulbsShown] = useState<boolean>(false)
	const [bulbsAnimation, setBulbsAnimation] = useState<boolean>(false)
	const [leftBannerShown, setLeftBannerShown] = useState<boolean>(false)
	const [rightBannerShown, setRightBannerShown] = useState<boolean>(false)
	const [leftPresentBoxShown, setLeftPresentBoxShown] = useState<boolean>(false)
	const [rightPresentBoxShown, setRightPresentBoxShown] = useState<boolean>(false)
	const [balloonFlying, setBalloonFlying] = useState<boolean>(false)
	const [cakeShown, setCakeShown] = useState<boolean>(false)
	const [candleLighten, setCandleLighten] = useState<boolean>(false)
	const [happyBirthdayShown, setHappyBirthdayShown] = useState<boolean>(false)
	const [messageForYouShown, setMessageForYouShown] = useState<boolean>(false)

	const [turnOnLightButton, showTurnOnLightButton] = useState<boolean>(false)
	const [playMusicButton, showPlayMusicButton] = useState<boolean>(false)
	const [decorateButtonShown, showDecorateButton] = useState<boolean>(false)
	const [flyBalloonButton, showFlyBalloonButton] = useState<boolean>(false)
	const [makeCakeButton, showMakeCakeButton] = useState<boolean>(false)
	const [lightCandleButton, showLightCandleButton] = useState<boolean>(false)
	const [happyBirthdayButton, showHappyBirthdayButton] = useState<boolean>(false)
	const [messageForYouButton, showMessageForYouButton] = useState<boolean>(false)
	const [openYourPresentButton, showOpenYourPresentButton] = useState<boolean>(false)

	function showMessageForYou(index = 1) {
		if (!messageRef?.current) {
			return
		}

		const isLastChild = messageRef.current.childElementCount === index + 1
		const message = messageRef.current.children.item(0)
		const child = messageRef.current.children.item(index)
		if (!message || !child) {
			setMessageForYouShown(true)
			return
		}

		message.innerHTML = child.innerHTML
		message.setAttribute("style", "opacity: 100")

		setTimeout(
			() => {
				message.setAttribute("style", "opacity: 0")
				setTimeout(() => {
					message.innerHTML = ""
					showMessageForYou(index + 1)
				}, 1000)
			},
			isLastChild ? 5000 : 2000
		)
	}

	function showPresentMessage() {
		if (!messageRef?.current) {
			return
		}

		const message = messageRef.current.children.item(0)
		if (!message) {
			return
		}

		message.innerHTML = "Hadiahmu lagi dalam perjalanan yaa!"
		message.setAttribute("style", "opacity: 100")
	}

	function afterMount1000() {
		showTurnOnLightButton(true)
	}

	function afterThemeChanged4000() {
		if (theme === ThemeTransition.to) {
			showPlayMusicButton(true)
		}
	}

	function afterSongPlayingChanged6500() {
		if (songPlaying) {
			showDecorateButton(true)
		}
	}

	function afterLeftBannerShownChanged750() {
		if (leftBannerShown) {
			setRightBannerShown(true)
		}
	}

	function afterRightBannerShownChanged750() {
		if (rightBannerShown) {
			setLeftPresentBoxShown(true)
		}
	}

	function afterLeftPresentBoxShownChanged500() {
		if (leftPresentBoxShown) {
			setRightPresentBoxShown(true)
		}
	}

	function afterRightPresentBoxShownChanged1000() {
		if (rightBannerShown) {
			showFlyBalloonButton(true)
		}
	}

	function afterBalloonFlyingChanged10000() {
		if (balloonFlying) {
			showMakeCakeButton(true)
		}
	}

	function afterCakeShownChanged3000() {
		if (messageForYouShown) {
			return
		}

		if (cakeShown) {
			showLightCandleButton(true)
		}
	}

	function afterCandleLightenChanged4000() {
		if (messageForYouShown) {
			return
		}

		if (candleLighten) {
			showHappyBirthdayButton(true)
		}
	}

	function afterHappyBirthdayShownChanged3000() {
		if (happyBirthdayShown) {
			showMessageForYouButton(true)
		}
	}

	function afterMessageForYouShownChanged2000() {
		if (messageForYouShown) {
			setCandleLighten(true)
			setCakeShown(true)
			setTimeout(() => {
				showOpenYourPresentButton(true)
			}, 1500)
		}
	}

	function onTurnOnLightButtonClicked() {
		showTurnOnLightButton(false)
		setTimeout(() => {
			setTheme(ThemeTransition.to)
			setBulbsShown(true)
		}, 0)
	}

	function onPlayMusicButtonClicked() {
		showPlayMusicButton(false)
		audioRef?.current?.play().then(() => {
			setBulbsAnimation(true)
			setSongPlaying(true)
		})
	}

	function onLetsDecorateButtonClicked() {
		showDecorateButton(false)
		contentRef?.current?.scrollTo({ top: 0 })
		setTimeout(() => {
			setLeftBannerShown(true)
		}, 0)
	}

	function onFlyBalloonsButtonClicked() {
		showFlyBalloonButton(false)
		setBalloonFlying(true)
	}

	function onMakeMostDeliciousCakeButtonClicked() {
		showMakeCakeButton(false)
		setCakeShown(true)
	}

	function onLightCandleButtonClicked() {
		showLightCandleButton(false)
		setCandleLighten(true)
	}

	function onHappyBirthdayButtonClicked() {
		showHappyBirthdayButton(false)
		setHappyBirthdayShown(true)
	}

	function onAMessageForYouButtonClicked() {
		showMessageForYouButton(false)
		setCandleLighten(false)
		setTimeout(() => {
			setCakeShown(false)
			setTimeout(() => {
				showMessageForYou()
			}, 1500)
		}, 2000)
	}

	function onOpenYourPresentButtonClicked() {
		showOpenYourPresentButton(false)
		setSongLoop(false)
		setTimeout(() => {
			setCakeShown(false)
			setTimeout(() => {
				showPresentMessage()
			}, 1500)
		}, 2000)
	}

	useTimeoutEffect(afterMount1000, 1000, [])
	useTimeoutEffect(afterThemeChanged4000, 4000, [theme])
	useTimeoutEffect(afterSongPlayingChanged6500, 6500, [songPlaying])
	useTimeoutEffect(afterLeftBannerShownChanged750, 750, [leftBannerShown])
	useTimeoutEffect(afterRightBannerShownChanged750, 750, [rightBannerShown])
	useTimeoutEffect(afterLeftPresentBoxShownChanged500, 500, [leftPresentBoxShown])
	useTimeoutEffect(afterRightPresentBoxShownChanged1000, 1000, [rightPresentBoxShown])
	useTimeoutEffect(afterBalloonFlyingChanged10000, 10000, [balloonFlying])
	useTimeoutEffect(afterCakeShownChanged3000, 3000, [cakeShown])
	useTimeoutEffect(afterCandleLightenChanged4000, 4000, [candleLighten])
	useTimeoutEffect(afterHappyBirthdayShownChanged3000, 3000, [happyBirthdayShown])
	useTimeoutEffect(afterMessageForYouShownChanged2000, 2000, [messageForYouShown])

	return (
		<BaseLayout className="party-page" theme={theme}>
			<BirthdayAudio ref={audioRef} loop={songLoop} />
			<Bulbs animation={bulbsAnimation} shown={bulbsShown} />
			<div className="banner">
				<img
					className={classNames("image", `opacity-${leftBannerShown ? 100 : 0}`)}
					alt="Selamat Ulang Tahun"
					src="/assets/images/left-banner.png"
				/>
				<img
					className={classNames("image", `opacity-${rightBannerShown ? 100 : 0}`)}
					alt="Selamat Ulang Tahun"
					src="/assets/images/right-banner.png"
				/>
			</div>
			<div ref={contentRef} className="content">
				<div className="happy-birthday">
					<img
						className={classNames("image", `opacity-${happyBirthdayShown ? 100 : 0}`)}
						alt="Selamat Ulang Tahun"
						src="/assets/images/happy-birthday.png"
					/>
				</div>
				<div ref={messageRef} className="message-for-you">
					<p className="message" style={{ opacity: 0 }}></p>
					<p className="hidden">Hari ini...</p>
					<p className="hidden">seindah hari-hari lain</p>
					<p className="hidden">namun tanpa kau sadari</p>
					<p className="hidden">satu tahun telah berlalu</p>
					<p className="hidden">hanya dalam satu kedipan mata</p>
					<p className="hidden">
						<strong>Namun</strong>
					</p>
					<p className="hidden">Apakah kamu tahu?</p>
					<p className="hidden">Bahwa hari ini sungguh spesial</p>
					<p className="hidden">sangat spesial...</p>
					<p className="hidden">bagimu</p>
					<p className="hidden">Aku ingin membuat hari ini...</p>
					<p className="hidden">menjadi hari yang terbaik</p>
					<p className="hidden">Dan izinkan aku...</p>
					<p className="hidden">membagikan sebuah kebahagian padamu</p>
					<p className="hidden">Aku membuat semua ini...</p>
					<p className="hidden">sebagai salah satu hadiahku untukmu</p>
					<p className="hidden">Terima kasih telah dilahirkan</p>
					<p className="hidden">Terima kasih telah mencintaiku</p>
					<p className="hidden">Terima kasih telah mau menemaniku...</p>
					<p className="hidden">dan selalu di sampingku</p>
					<p className="hidden">Terima kasih untuk semuanya</p>
					<p className="hidden">Aku berharap...</p>
					<p className="hidden">semoga hidupmu selalu diberikan kemudahan</p>
					<p className="hidden">dan segala impianmu menjadi nyata</p>
					<p className="hidden">Jangan khawatir dan percayalah</p>
					<p className="hidden">Tahun ini akan lebih baik...</p>
					<p className="hidden">dan kamu akan menemukan...</p>
					<p className="hidden">kebahagiaan di sepanjang jalanmu</p>
					<p className="hidden">Tetap semangat ya!</p>
					<p className="hidden">Aku tahu banyak sekali...</p>
					<p className="hidden">yang ini kamu gapai tahun ini</p>
					<p className="hidden">Sayang, hampir 10 tahun aku mengenalmu...</p>
					<p className="hidden">dan aku tahu kamu pasti bisa menggapai semuanya</p>
					<p className="hidden">Lastly...</p>
					<p className="hidden">I would like to wish you one more time</p>
					<p className="hidden">
						a very <strong>happy birthday</strong>, my dear sweetheart...
					</p>
					<p className="hidden">Choirul Amanah</p>
				</div>
			</div>
			<div className="click-to-action">
				<Button
					disableEffect
					shown={turnOnLightButton}
					text="Nyalain Lampu"
					onClick={onTurnOnLightButtonClicked}
				/>
				<Button
					shown={playMusicButton}
					text="Putar Musik"
					onClick={onPlayMusicButtonClicked}
				/>
				<Button
					shown={decorateButtonShown}
					text="Ayo Dekorasi!"
					onClick={onLetsDecorateButtonClicked}
				/>
				<Button
					shown={flyBalloonButton}
					text="Terbangin Balon"
					onClick={onFlyBalloonsButtonClicked}
				/>
				<Button
					shown={makeCakeButton}
					text="Bikin Kue Paling Enak"
					onClick={onMakeMostDeliciousCakeButtonClicked}
				/>
				<Button
					shown={lightCandleButton}
					text="Nyalain Lilin"
					onClick={onLightCandleButtonClicked}
				/>
				<Button
					shown={happyBirthdayButton}
					text="Selamat Ulang Tahun!"
					onClick={onHappyBirthdayButtonClicked}
				/>
				<Button
					shown={messageForYouButton}
					text="Satu Pesan Untukmu"
					onClick={onAMessageForYouButtonClicked}
				/>
				<Button
					shown={openYourPresentButton}
					text="Buka Hadiahmu"
					onClick={onOpenYourPresentButtonClicked}
				/>
			</div>
			<div className="present-box">
				<img
					className={classNames("left-image", { hidden: !leftPresentBoxShown })}
					alt="Kado Ulang Tahun"
					src="/assets/images/left-present-box.png"
				/>
				<img
					className={classNames("right-image", { hidden: !rightPresentBoxShown })}
					alt="Kado Ulang Tahun"
					src="/assets/images/right-present-box.png"
				/>
			</div>
			<div className="cake">
				<div className={classNames("image-container", `opacity-${cakeShown ? 100 : 0}`)}>
					{candleLighten ? (
						<img
							className="image"
							alt="Kue Ulang Tahun"
							src="/assets/images/cake-animation.png"
						/>
					) : (
						<img
							className="image"
							alt="Kue Ulang Tahun"
							src="/assets/images/cake.png"
						/>
					)}
				</div>
			</div>
			<div className="balloons">
				{AllBalloonNumbers.map((number) => (
					<Balloon
						key={number}
						fly={balloonFlying}
						number={number}
						showCharacter={happyBirthdayShown}
					/>
				))}
			</div>
		</BaseLayout>
	)
}

export const getServerSideProps = withDefaultAuthentication()

export default PartyPage
