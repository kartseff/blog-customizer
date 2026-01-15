import { useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import type { OptionType, ArticleStateType } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const toggleOpen = () => {
		setIsOpen((prevOpenState) => !prevOpenState);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState({ ...formState, fontSizeOption: option });
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState({ ...formState, fontColor: option });
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState({ ...formState, contentWidth: option });
	};

	const handleApply = () => {
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			{isOpen && (
				<aside
					className={clsx(styles.container, styles.container_open)}
					ref={rootRef}>
					<form className={styles.form}>
						{/* Заголовок */}
						<Text as='h2' size={31} weight={800}>
							Задайте параметры
						</Text>

						{/* Шрифт */}
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
						/>

						{/* Размер шрифта */}
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>

						{/* Цвет шрифта */}
						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
						/>

						<Separator />

						{/* Цвет фона */}
						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
						/>

						{/* Ширина контента */}
						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
						/>

						{/* Кнопки */}
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='clear'
								htmlType='reset'
								onClick={handleReset}
							/>
							<Button
								title='Применить'
								type='apply'
								htmlType='submit'
								onClick={handleApply}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
