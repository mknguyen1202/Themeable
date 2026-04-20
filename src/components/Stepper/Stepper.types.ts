export interface StepperStep {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
}

export type StepperStatus = 'complete' | 'current' | 'incomplete' | 'error';

export interface StepperProps {
    steps: StepperStep[];
    currentStep: number;
    orientation?: 'horizontal' | 'vertical';
    onStepClick?: (step: number) => void;
    allowClickToStep?: boolean;
    stepStatus?: (step: number) => StepperStatus;
}
