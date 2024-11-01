import { useState, useRef, useEffect } from 'react';
import Head from "../../components/head/Head"
import '../../assets/scss/pages/dashboard/_main.scss';
import '../../assets/scss/pages/dashboard/_upload-contacts.scss';
import '../../assets/scss/pages/dashboard/_statistic.scss';
import '../../assets/scss/pages/dashboard/_pipeline.scss';
import Button from "../../components/button/Button";
import CustomSelect from "../../components/custom-select/CustomSelect";

function Dashboard() {

	const [isActiveFilter, setIsActiveFilter] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// Обработчик клика вне контейнера
		const handleClickOutside = (event: MouseEvent) => {
			// Проверяем, если клик произошел вне контейнера
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsActiveFilter(false); // Сбрасываем активное состояние
			}
		};

		// Добавляем слушатель события
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			// Удаляем слушатель события при размонтировании компонента
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	];

	const statusUpdatesOptions = [
		{ value: 'Referral Accepted', label: 'Referral Accepted' },
		{ value: 'Work in Progress', label: 'Work in Progress' },
		{ value: 'Didn’t work out', label: 'Didn’t work out' },
		{ value: 'Referral Pending', label: 'Referral Pending' },
		{ value: 'Referral Closed', label: 'Referral Closed' },
	];

	const potentialReferralValueOptions = [
		{ value: '$_Value', label: '$_Value' },
		{ value: '#_Coins', label: '#_Coins' },
	];

	function handleFilterActive() {
		setIsActiveFilter(!isActiveFilter);
	}

	return (
		<>
			<Head title="Dashboard" />
			<section className="dashboard">
				<div className="upload-contacts dashboard-block">
					<h3 className="upload-contacts__title title-min">
						Upload your Contacts
					</h3>
					<div className="upload-contacts__icon">
						<img src="/img/dashboard/upload-contacts-icon.png" width={87} height={91} alt="" />
					</div>
					<a href="#" className="upload-contacts__button button">
						Upload
					</a>
				</div>
				<div className="statistic">
					<div className="statistic__block dashboard-block">
						<div className="statistic__item">
							<div className="statistic__item-col">
								<strong className="statistic__item-value">4</strong>
								<b className="statistic__item-name">Referrals Sent</b>
							</div>
							<div className="statistic__item-col">
								<div className="statistic__item-chart"></div>
							</div>
							<div className="statistic__item-col">
								<div className="statistic__item-last">
									<b>
										<svg width="24" height="24">
											<use href="/img/sprites.svg#arrow-next"></use>
										</svg>
										<span>0</span>
									</b>
									<div>past 30 days</div>
								</div>
							</div>
						</div>
						<div className="statistic__item">
							<div className="statistic__item-col">
								<strong className="statistic__item-value">4</strong>
								<b className="statistic__item-name">Referrals Sent</b>
							</div>
							<div className="statistic__item-col">
								<div className="statistic__item-chart"></div>
							</div>
							<div className="statistic__item-col">
								<div className="statistic__item-last">
									<b>
										<svg width="24" height="24">
											<use href="/img/sprites.svg#arrow-next"></use>
										</svg>
										<span>0</span>
									</b>
									<div>past 30 days</div>
								</div>
							</div>
						</div>
					</div>
					<div className="statistic__block dashboard-block">
						<div className="statistic__item">
							<div className="statistic__item-col">
								<strong className="statistic__item-value">4</strong>
								<b className="statistic__item-name">Referrals Sent</b>
							</div>
							<div className="statistic__item-col">
								<div className="statistic__item-chart"></div>
							</div>
							<div className="statistic__item-col">
								<div className="statistic__item-last">
									<b>
										<svg width="24" height="24">
											<use href="/img/sprites.svg#arrow-next"></use>
										</svg>
										<span>0</span>
									</b>
									<div>past 30 days</div>
								</div>
							</div>
						</div>
						<div className="statistic__item">
							<div className="statistic__item-col">
								<strong className="statistic__item-value">4</strong>
								<b className="statistic__item-name">Referrals Sent</b>
							</div>
							<div className="statistic__item-col">
								<div className="statistic__item-chart"></div>
							</div>
							<div className="statistic__item-col">
								<div className="statistic__item-last">
									<b>
										<svg width="24" height="24">
											<use href="/img/sprites.svg#arrow-next"></use>
										</svg>
										<span>0</span>
									</b>
									<div>past 30 days</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="pipeline">
					<h2 className="pipeline__title title-min">
						Pipeline Status
					</h2>
					<div className="pipeline__inner dashboard-block">
						<div className="pipeline__header">
							<form className="pipeline__search" role="search">
								<label>
									<svg width="24" height="24">
										<use href="/img/sprites.svg#search"></use>
									</svg>
									<input type="search" name="search" placeholder="Search" className="pipeline__search-input" />
								</label>
							</form>
							<div className="pipeline__filter filter" ref={containerRef}>
								<div className="filter__active-params">
									<button type="button" className="filter__active-param" aria-label="Referral Name">
										<span>Referral Name</span>
										<svg width="24" height="24">
											<use href="/img/sprites.svg#close"></use>
										</svg>
									</button>
									<button type="button" className="filter__active-param" aria-label="Referral Partner">
										<span>Referral Partner</span>
										<svg width="24" height="24">
											<use href="/img/sprites.svg#close"></use>
										</svg>
									</button>
								</div>
								<button type="button" className="filter__target" aria-label="Filters" onClick={handleFilterActive}>
									<svg width="24" height="24">
										<use href="/img/sprites.svg#filter"></use>
									</svg>
									<span>Filters</span>
								</button>
								<div className={`filter__popup filter-popup${isActiveFilter ? " is-active" : ""}`}>
									<div className="filter-popup__list">
										<div className="filter-popup__item">
											<b className="filter-popup__item-name">Referral Name</b>
											<div className="filter-popup__select">
												<CustomSelect name="Referral Name" options={options} />
											</div>
										</div>
										<div className="filter-popup__item">
											<b className="filter-popup__item-name">Referral Partner</b>
											<ul className="filter-popup__checkboxes">
												<li>
													<label>
														<input type="checkbox" name="Referral Partner 1" value="Kevin Markos" />
														<span>
															<svg width="24" height="24">
																<use href="/img/sprites.svg#check"></use>
															</svg>
														</span>
														<span>
															Kevin Markos
														</span>
													</label>
												</li>
												<li>
													<label>
														<input type="checkbox" name="Referral Partner 2" value="Jenny Ferloppes" />
														<span>
															<svg width="24" height="24">
																<use href="/img/sprites.svg#check"></use>
															</svg>
														</span>
														<span>
															Jenny Ferloppes
														</span>
													</label>
												</li>
												<li>
													<label>
														<input type="checkbox" name="Referral Partner 3" value="Luis Fernando" />
														<span>
															<svg width="24" height="24">
																<use href="/img/sprites.svg#check"></use>
															</svg>
														</span>
														<span>
															Luis Fernando
														</span>
													</label>
												</li>
												<li>
													<label>
														<input type="checkbox" name="Referral Partner 4" value="Deny Tuiss" />
														<span>
															<svg width="24" height="24">
																<use href="/img/sprites.svg#check"></use>
															</svg>
														</span>
														<span>
															Deny Tuiss
														</span>
													</label>
												</li>
											</ul>
										</div>
										<div className="filter-popup__item">
											<b className="filter-popup__item-name">Status Updates</b>
											<div className="filter-popup__select">
												<CustomSelect name="Status Updates" options={statusUpdatesOptions} />
											</div>
										</div>
										<div className="filter-popup__item">
											<b className="filter-popup__item-name">Potential Referral Value</b>
											<div className="filter-popup__select">
												<CustomSelect name="Potential Referral Value" options={potentialReferralValueOptions} />
											</div>
										</div>
									</div>
									<Button className="filter-popup__active" onClick={handleFilterActive}>
										Apply
									</Button>
								</div>
							</div>
						</div>
						<table className="pipeline__table">
							<thead>
								<tr>
									<th>Referral Name</th>
									<th>Referral Partner</th>
									<th>Date Referral Sent</th>
									<th>Status Updates</th>
									<th>Potential Referral Value</th>
									<th>Last Updated</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<span>Referral Name</span>
										<span>
											Lorem ipsum dolor
										</span>
									</td>
									<td>
										<span>Referral Partner</span>
										<span>
											<div className="pipeline__user">
												<div className="pipeline__user-avatar">
													<img src="/img/dashboard/referral-partner-avatar-1.png" width={36} height={36} loading="lazy" alt="" />
												</div>
												<b>Kevin Markos</b>
												<div>agent</div>
											</div>
										</span>
									</td>
									<td>
										<span>Date Referral Sent</span>
										<span>

										</span>
									</td>
									<td>
										<span>Status Updates</span>
										<span>
											Work in Progress
										</span>
									</td>
									<td>
										<span>Potential Referral Value</span>
										<span>
											$_Value
										</span>
									</td>
									<td>
										<span>Last Updated</span>
										<span>
											<time dateTime="10-06-2024:09:37">
												10.06.2024 <br /> 09:37 AM
											</time>
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<span>Referral Name</span>
										<span>
											Lorem ipsum dolor
										</span>
									</td>
									<td>
										<span>Referral Partner</span>
										<span>
											<div className="pipeline__user">
												<div className="pipeline__user-avatar">
													<img src="/img/dashboard/referral-partner-avatar-2.png" width={36} height={36} loading="lazy" alt="" />
												</div>
												<b>Jenny Ferloppes</b>
												<div>agent</div>
											</div>
										</span>
									</td>
									<td>
										<span>Date Referral Sent</span>
										<span>

										</span>
									</td>
									<td>
										<span>Status Updates</span>
										<span>
											Referral Pending
										</span>
									</td>
									<td>
										<span>Potential Referral Value</span>
										<span>
											#_Coins
										</span>
									</td>
									<td>
										<span>Last Updated</span>
										<span>
											<time dateTime="10-06-2024:09:37">
												10.06.2024 <br /> 09:37 AM
											</time>
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<span>Referral Name</span>
										<span>
											Lorem ipsum dolor
										</span>
									</td>
									<td>
										<span>Referral Partner</span>
										<span>
											<div className="pipeline__user">
												<div className="pipeline__user-avatar">
													<img src="/img/dashboard/referral-partner-avatar-1.png" width={36} height={36} loading="lazy" alt="" />
												</div>
												<b>Kevin Markos</b>
												<div>agent</div>
											</div>
										</span>
									</td>
									<td>
										<span>Date Referral Sent</span>
										<span>

										</span>
									</td>
									<td>
										<span>Status Updates</span>
										<span>
											Work in Progress
										</span>
									</td>
									<td>
										<span>Potential Referral Value</span>
										<span>
											$_Value
										</span>
									</td>
									<td>
										<span>Last Updated</span>
										<span>
											<time dateTime="10-06-2024:09:37">
												10.06.2024 <br /> 09:37 AM
											</time>
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="pipeline__footer">
						<a href="#" className="pipeline__view-all button">
							View all activity history
						</a>
					</div>
				</div>
			</section>
		</>
	);
}

export default Dashboard;
