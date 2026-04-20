import { stepperTokens } from './Stepper.tokens';
import type { StepperProps, StepperStatus } from './Stepper.types';
import styles from './Stepper.module.scss';

export function Stepper({
    steps,
    currentStep,
    orientation = 'horizontal',
    onStepClick,
    allowClickToStep = false,
    stepStatus,
}: StepperProps) {
    const getStepStatus = (index: number): StepperStatus => {
        if (stepStatus) {
            return stepStatus(index);
        }
        if (index < currentStep) return 'complete';
        if (index === currentStep) return 'current';
        return 'incomplete';
    };

    const handleStepClick = (index: number) => {
        if (!allowClickToStep || !onStepClick) return;

        const status = getStepStatus(index);
        if (status === 'complete' || status === 'current') {
            onStepClick(index);
        }
    };

    const style = {
        '--stepper-complete-color': stepperTokens.completeColor,
        '--stepper-current-color': stepperTokens.currentColor,
        '--stepper-incomplete-color': stepperTokens.incompleteColor,
        '--stepper-error-color': stepperTokens.errorColor,
        '--stepper-text-color': stepperTokens.textColor,
        '--stepper-description-color': stepperTokens.descriptionColor,
        '--stepper-bg': stepperTokens.backgroundColor,
        '--stepper-connector-color': stepperTokens.connectorColor,
        '--stepper-icon-size': stepperTokens.iconSize,
        '--stepper-connector-thickness': stepperTokens.connectorThickness,
    } as React.CSSProperties;

    return (
        <div className={`${styles.stepper} ${styles[orientation]}`} style={style}>
            {steps.map((step, index) => {
                const status = getStepStatus(index);
                const isClickable = allowClickToStep && (status === 'complete' || status === 'current');
                const isLast = index === steps.length - 1;

                const statusIcons = {
                    complete: '✓',
                    current: index + 1,
                    incomplete: index + 1,
                    error: '✕',
                };

                return (
                    <div key={step.id} className={styles.stepWrapper}>
                        <div
                            className={`${styles.step} ${styles[status]} ${isClickable ? styles.clickable : ''}`}
                            onClick={() => handleStepClick(index)}
                        >
                            <div className={styles.stepIndicator}>
                                <div className={styles.stepIcon}>
                                    {step.icon || statusIcons[status]}
                                </div>
                            </div>
                            <div className={styles.stepContent}>
                                <div className={styles.stepLabel}>{step.label}</div>
                                {step.description && (
                                    <div className={styles.stepDescription}>{step.description}</div>
                                )}
                            </div>
                        </div>
                        {!isLast && <div className={`${styles.connector} ${styles[status]}`} />}
                    </div>
                );
            })}
        </div>
    );
}
