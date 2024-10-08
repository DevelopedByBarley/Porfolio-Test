import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { playOrStopSelectSound, playOrStopThemeSound } from '../helpers/PlayAudio';
import { useCookies } from "react-cookie";
import { Intro } from "../components/Intro";
import { toast } from "react-toastify";


export default function Welcome() {
	const [cookies, setCookies] = useCookies(['sound', 'intro', 'visited']);

	const [introCheckbox, setIntroCheckbox] = useState(false);
	const [soundCheckbox, setSoundCheckbox] = useState(false);

	useEffect(() => {
		if (cookies.intro) {
			setCookies('visited', 1, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	const submitOptionsAndSetCookies = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log("Intro:", introCheckbox);
		console.log("Sound:", soundCheckbox);

		setCookies('sound', soundCheckbox ? 1 : 0, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
		setCookies('intro', introCheckbox ? 1 : 0, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

		if (soundCheckbox) {
			playOrStopSelectSound('play');
		}

		if (!introCheckbox) {
			setCookies('visited', 1, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
		} else {
			setTimeout(() => {
				setCookies('visited', 1, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
			}, 27000)
		}

		if (introCheckbox && soundCheckbox) {
			playOrStopThemeSound('play');
		}


		toast.dark('Beállítások elvogadva..')

	}



	const introCheckboxHandler = () => {
		setIntroCheckbox(!introCheckbox);
		console.log("Intro checkbox:", introCheckbox);
	}



	const soundCheckboxHandler = () => {
		setSoundCheckbox(!soundCheckbox);
		console.log("Sound checkbox:", soundCheckbox);
	}

	if (cookies.intro) {
		return <Intro />
	}


	// Ha intro = 1 akkor nem látszódhat a welcome


	return (
		<>
			<Alert title="WELCOME" bgColor="mainDark">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, itaque. Illum adipisci aperiam atque molestiae dolore voluptatum accusamus, quas, cum inventore at nostrum. Atque voluptatum modi sunt doloribus nostrum architecto?
				</p>
				<hr className="my-5" />
				<form onSubmit={submitOptionsAndSetCookies} className="mt-5">
					<h3 className="font-bold text-3xl my-3">Beállítások</h3>

					<div className="flex items-center justify-center mt-5 px-3">
						<div className="flex items-center h-5">
							<input
								id="sound-checkbox"
								aria-describedby="sound-checkbox-text"
								type="checkbox"
								value=""
								checked={soundCheckbox}
								onChange={soundCheckboxHandler}

								className="w-4 h-4 text-mainOrange bg-gray-100/50 accent-mainOrange border-gray-300 rounded focus:ring-black dark:focus:ring-mainOrange dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>
						<div className="ms-2 text-sm text-start">
							<label
								htmlFor="sound-checkbox"
								className="font-medium text-white dark:text-gray-300"
							>
								Szeretném, ha az oldal hangot és effekteket használjon.
							</label>
							<p
								id="sound-checkbox-text"
								className="text-xs font-normal text-gray-500 dark:text-gray-300"
							>
								For orders shipped from $25 in books or $29 in other categories
							</p>
						</div>
					</div>
					<div className="flex items-center justify-center mt-5 px-3">
						<div className="flex items-center h-5">
							<input
								id="intro-checkbox"
								aria-describedby="intro-checkbox-text"
								type="checkbox"
								value=""
								checked={introCheckbox}
								onChange={introCheckboxHandler}
								className="w-4 h-4 text-mainOrange bg-gray-100/50 accent-mainOrange border-gray-300 rounded focus:ring-black dark:focus:ring-mainOrange dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>
						<div className="ms-2 text-sm text-start">
							<label
								htmlFor="intro-checkbox"
								className="font-medium text-white dark:text-gray-300"
							>
								Szeretném, ha az intro lejátszódna induláskor.
							</label>
							<p
								id="intro-checkbox-text"
								className="text-xs font-normal text-gray-500 dark:text-gray-300"
							>
								For orders shipped from $25 in books or $29 in other categories
							</p>
						</div>
					</div>

					<button
						type="submit"
						className="border border-mainOrange py-1 px-3 mt-5 hover:bg-mainOrange hover:text-mainDark font-semibold"

					>
						Elküld
					</button>
				</form>
			</Alert>




		</>
	);
}
