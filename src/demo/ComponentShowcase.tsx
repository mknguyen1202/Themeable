import { useState } from 'react';
import {
    Button, ButtonGroup, Input, TextArea, Select, Checkbox, Radio, Switch, Slider,
    Tabs, Accordion, Breadcrumb, Pagination, Stepper,
    Dialog, Drawer, Popover, Tooltip, useToastContext,
    Icons, Avatar, Badge, Spinner, Progress, Divider,
    Card, Menu, Table,
    Lightbox, DatePicker, TimePicker, Carousel,
    Stack, Grid, Container,
} from '../components';
import type { Tab, AccordionItem, BreadcrumbItem, StepperStep, MenuItem, Column, LightboxImage, TimeValue } from '../components';
import './ComponentShowcase.css';

interface ComponentShowcaseProps {
    componentId: string;
    onOpenEditor: () => void;
}

export function ComponentShowcase({ componentId, onOpenEditor }: ComponentShowcaseProps) {
    const toast = useToastContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [datePickerValue, setDatePickerValue] = useState<Date | null>(null);
    const [datePickerRangeValue, setDatePickerRangeValue] = useState<Date | null>(null);
    const [timePickerValue, setTimePickerValue] = useState<TimeValue | null>(null);
    const [timePickerAMPM, setTimePickerAMPM] = useState<TimeValue | null>(null);
    const [timePickerSeconds, setTimePickerSeconds] = useState<TimeValue | null>(null);
    const [paginationPage, setPaginationPage] = useState(1);
    const [paginationPage2, setPaginationPage2] = useState(5);
    const [paginationPage3, setPaginationPage3] = useState(3);
    const [progressValue, setProgressValue] = useState(65);

    const renderShowcase = () => {
        switch (componentId) {
            case 'button':
                return (
                    <ShowcaseSection title="Button" onOpenEditor={onOpenEditor}>
                        <p className="showcase-label">Tones</p>
                        <div className="showcase-row">
                            <Button tone="primary">Primary</Button>
                            <Button tone="secondary">Secondary</Button>
                            <Button tone="tertiary">Tertiary</Button>
                            <Button tone="success">Success</Button>
                            <Button tone="warning">Warning</Button>
                            <Button tone="danger">Danger</Button>
                        </div>
                        <p className="showcase-label">Variants</p>
                        <div className="showcase-row">
                            <Button variant="filled">Filled</Button>
                            <Button variant="outlined">Outlined</Button>
                            <Button variant="text">Text</Button>
                            <Button variant="elevated">Elevated</Button>
                            <Button variant="filledTonal">Filled Tonal</Button>
                            <Button disabled>Disabled</Button>
                        </div>
                        <p className="showcase-label">Sizes</p>
                        <div className="showcase-row">
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                        </div>
                        <p className="showcase-label">Icon button</p>
                        <div className="showcase-row">
                            <Button variant="icon" size="sm"><Icons.Search size="14px" /></Button>
                            <Button variant="icon" size="md"><Icons.Settings size="16px" /></Button>
                            <Button variant="icon" size="lg"><Icons.Heart size="18px" /></Button>
                            <Button variant="icon" tone="danger" size="md"><Icons.X size="16px" /></Button>
                            <Button variant="icon" tone="success" size="md"><Icons.Check size="16px" /></Button>
                        </div>
                        {/* <p className="showcase-label">Icon button — rounded square</p>
                        <div className="showcase-row">
                            <Button variant="icon" size="sm" style={{ '--btn-radius': 'var(--radius-sm)' } as React.CSSProperties}><Icons.Search size="14px" /></Button>
                            <Button variant="icon" size="md" style={{ '--btn-radius': 'var(--radius-md)' } as React.CSSProperties}><Icons.Settings size="16px" /></Button>
                            <Button variant="icon" size="lg" style={{ '--btn-radius': 'var(--radius-md)' } as React.CSSProperties}><Icons.Heart size="18px" /></Button>
                            <Button variant="icon" tone="secondary" size="md" style={{ '--btn-radius': 'var(--radius-md)' } as React.CSSProperties}><Icons.Star size="16px" /></Button>
                            <Button variant="icon" tone="danger" size="md" style={{ '--btn-radius': 'var(--radius-sm)' } as React.CSSProperties}><Icons.X size="16px" /></Button>
                            <Button variant="icon" tone="primary" size="md" style={{ '--btn-radius': 'var(--radius-md)' } as React.CSSProperties}><Icons.Plus size="16px" /></Button>
                        </div> */}
                        <p className="showcase-label">With icon — icon right</p>
                        <div className="showcase-row">
                            <Button>Next <Icons.ChevronRight size="16px" /></Button>
                            <Button variant="outlined">More options <Icons.ChevronDown size="16px" /></Button>
                            <Button tone="success">Confirm <Icons.Check size="16px" /></Button>
                            <Button tone="danger" variant="outlined">Delete <Icons.X size="16px" /></Button>
                            <Button variant="text">Learn more <Icons.ChevronRight size="16px" /></Button>
                        </div>
                        <p className="showcase-label">FAB</p>
                        <div className="showcase-row">
                            <Button variant="fab" size="sm"><Icons.Plus size="16px" /></Button>
                            <Button variant="fab" size="md"><Icons.Plus size="20px" /></Button>
                            <Button variant="fab" size="lg"><Icons.Plus size="24px" /></Button>
                            <Button variant="fab" tone="secondary" size="md"><Icons.Heart size="20px" /></Button>
                            <Button variant="fab" tone="danger" size="md"><Icons.X size="20px" /></Button>
                        </div>
                        <p className="showcase-label">FAB Extended</p>
                        <div className="showcase-row">
                            <Button variant="fabExtended" size="sm"><Icons.Plus size="14px" />Create</Button>
                            <Button variant="fabExtended" size="md"><Icons.Plus size="16px" />New Item</Button>
                            <Button variant="fabExtended" size="lg"><Icons.Heart size="18px" />Add to Favorites</Button>
                            <Button variant="fabExtended" tone="success" size="md"><Icons.Check size="16px" />Confirm</Button>
                        </div>
                    </ShowcaseSection>
                );

            case 'button-group':
                return (
                    <ShowcaseSection title="Button Group" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row">
                            <ButtonGroup>
                                <Button>Left</Button>
                                <Button>Center</Button>
                                <Button>Right</Button>
                            </ButtonGroup>
                        </div>
                        <div className="showcase-row">
                            <ButtonGroup orientation="vertical">
                                <Button>Top</Button>
                                <Button>Middle</Button>
                                <Button>Bottom</Button>
                            </ButtonGroup>
                        </div>
                    </ShowcaseSection>
                );

            case 'input':
                return (
                    <ShowcaseSection title="Input" onOpenEditor={onOpenEditor}>
                        <p className="showcase-label">Variants</p>
                        <div className="showcase-row">
                            <Input label="Outlined" variant="outlined" placeholder="Outlined input" />
                            <Input label="Filled" variant="filled" placeholder="Filled input" />
                            <Input label="Underlined" variant="underlined" placeholder="Underlined input" />
                        </div>

                        <p className="showcase-label">Sizes</p>
                        <div className="showcase-row">
                            <Input label="Small" inputSize="small" placeholder="Small" />
                            <Input label="Medium" inputSize="medium" placeholder="Medium" />
                            <Input label="Large" inputSize="large" placeholder="Large" />
                        </div>

                        <p className="showcase-label">Input types</p>
                        <div className="showcase-row">
                            <Input label="Text" type="text" placeholder="Enter your name" />
                            <Input label="Email" type="email" placeholder="user@example.com" />
                            <Input label="Password" type="password" placeholder="••••••••" />
                            <Input label="Number" type="number" placeholder="0" />
                            <Input label="Search" type="search" placeholder="Search…" />
                            <Input label="URL" type="url" placeholder="https://example.com" />
                            <Input label="Tel" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>

                        <p className="showcase-label">States</p>
                        <div className="showcase-row">
                            <Input label="Default" placeholder="Default" />
                            <Input label="With helper text" helperText="We'll never share your email." placeholder="user@example.com" />
                            <Input label="With error" error="This field is required" placeholder="Enter value" />
                            <Input label="Read-only" readOnly value="Read-only value" />
                            <Input label="Disabled" disabled value="Disabled input" />
                        </div>

                        <p className="showcase-label">Full width</p>
                        <div className="showcase-col">
                            <Input label="Full width outlined" fullWidth placeholder="Spans full container width" />
                            <Input label="Full width filled" variant="filled" fullWidth placeholder="Spans full container width" />
                            <Input label="Full width underlined" variant="underlined" fullWidth placeholder="Spans full container width" />
                        </div>
                    </ShowcaseSection>
                );

            case 'textarea':
                return (
                    <ShowcaseSection title="Text Area" onOpenEditor={onOpenEditor}>
                        <div className="showcase-col">
                            <TextArea label="Description" placeholder="Enter description..." rows={4} />
                            <TextArea label="With Error" error="Message is too short" rows={3} />
                        </div>
                    </ShowcaseSection>
                );

            case 'select':
                return (
                    <ShowcaseSection title="Select" onOpenEditor={onOpenEditor}>
                        <div className="showcase-col">
                            <Select
                                label="Country"
                                options={[
                                    { value: 'us', label: 'United States' },
                                    { value: 'uk', label: 'United Kingdom' },
                                    { value: 'ca', label: 'Canada' },
                                ]}
                            />
                            <Select
                                label="With Error"
                                error="Please select an option"
                                options={[{ value: '1', label: 'Option 1' }]}
                            />
                        </div>
                    </ShowcaseSection>
                );

            case 'checkbox':
                return (
                    <ShowcaseSection title="Checkbox" onOpenEditor={onOpenEditor}>
                        <div className="showcase-col">
                            <Checkbox label="Accept terms and conditions" />
                            <Checkbox label="Subscribe to newsletter" defaultChecked />
                            <Checkbox label="Disabled" disabled />
                            <Checkbox label="Disabled Checked" disabled checked />
                        </div>
                    </ShowcaseSection>
                );

            case 'radio':
                return (
                    <ShowcaseSection title="Radio" onOpenEditor={onOpenEditor}>
                        <div className="showcase-col">
                            <Radio label="Option 1" name="radio-group" value="1" />
                            <Radio label="Option 2" name="radio-group" value="2" defaultChecked />
                            <Radio label="Option 3" name="radio-group" value="3" />
                            <Radio label="Disabled" disabled />
                        </div>
                    </ShowcaseSection>
                );

            case 'switch':
                return (
                    <ShowcaseSection title="Switch" onOpenEditor={onOpenEditor}>
                        <div className="showcase-col">
                            <Switch label="Enable notifications" />
                            <Switch label="Dark mode" defaultChecked />
                            <Switch label="Disabled" disabled />
                        </div>
                    </ShowcaseSection>
                );

            case 'slider':
                return (
                    <ShowcaseSection title="Slider" onOpenEditor={onOpenEditor}>
                        <div className="showcase-col">
                            <Slider label="Volume" min={0} max={100} defaultValue={50} />
                            <Slider label="Temperature" min={-20} max={40} defaultValue={20} showValue />
                            <Slider label="Disabled" disabled defaultValue={30} />
                        </div>
                    </ShowcaseSection>
                );

            case 'tabs':
                const tabs: Tab[] = [
                    { id: '1', label: 'Profile', content: <div>Profile content</div> },
                    { id: '2', label: 'Settings', content: <div>Settings content</div> },
                    { id: '3', label: 'Notifications', content: <div>Notifications content</div> },
                ];
                return (
                    <ShowcaseSection title="Tabs" onOpenEditor={onOpenEditor}>
                        <Tabs tabs={tabs} variant="line" />
                        <Tabs tabs={tabs} variant="enclosed" />
                        <Tabs tabs={tabs} variant="pills" />
                    </ShowcaseSection>
                );

            case 'accordion':
                const faqItems: AccordionItem[] = [
                    { id: 'faq-1', icon: <Icons.Info size="16px" />, title: 'What is a design system?', content: 'A design system is a collection of reusable components, tokens, and guidelines that teams use to build products consistently and efficiently.' },
                    { id: 'faq-2', icon: <Icons.Settings size="16px" />, title: 'How do I customize the theme?', content: 'Pass a custom theme object to the ThemeProvider. You can override color families, geometry tokens, typography scales, and semantic role mappings to match your brand.' },
                    { id: 'faq-3', icon: <Icons.User size="16px" />, title: 'Is it accessible by default?', content: 'Yes. Every component follows WAI-ARIA best practices — keyboard navigation, focus management, screen-reader labels, and proper role/state attributes are built in.' },
                    { id: 'faq-4', icon: <Icons.X size="16px" />, title: 'Can I tree-shake unused components?', content: 'Absolutely. Each component is exported individually so bundlers like Vite and webpack can eliminate unused code from your production bundle.' },
                    { id: 'faq-5', title: 'Does it support dark mode?', content: 'Yes. The ThemeProvider resolves tokens for both light and dark palettes. Switch themes at runtime by passing a different theme; all CSS variables update instantly.' },
                    { id: 'faq-6', title: 'Is server-side rendering supported?', content: 'The component library is pure React with no DOM-at-import-time side effects, so it works in any SSR framework like Next.js or Remix out of the box.' },
                    { id: 'faq-7', title: 'This item is disabled', content: 'You will never read this.', disabled: true },
                ];
                return (
                    <ShowcaseSection title="Accordion" onOpenEditor={onOpenEditor}>
                        <p style={{ margin: '0 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Single open (default)</p>
                        <Accordion items={faqItems} defaultOpenIds={['faq-1']} />

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Allow multiple open</p>
                        <Accordion items={faqItems.slice(0, 5)} allowMultiple defaultOpenIds={['faq-1', 'faq-3']} />
                    </ShowcaseSection>
                );

            case 'breadcrumb':
                const breadcrumbItems: BreadcrumbItem[] = [
                    { label: 'Home', href: '#' },
                    { label: 'Components', href: '#' },
                    { label: 'Breadcrumb' },
                ];
                const longBreadcrumb: BreadcrumbItem[] = [
                    { label: 'Home', href: '#' },
                    { label: 'Products', href: '#' },
                    { label: 'Electronics', href: '#' },
                    { label: 'Laptops', href: '#' },
                    { label: 'Gaming', href: '#' },
                    { label: 'Model X500' },
                ];
                const iconBreadcrumb: BreadcrumbItem[] = [
                    { label: 'Home', href: '#', icon: <Icons.Home size="14px" /> },
                    { label: 'Settings', href: '#', icon: <Icons.Settings size="14px" /> },
                    { label: 'Profile' },
                ];
                return (
                    <ShowcaseSection title="Breadcrumb" onOpenEditor={onOpenEditor}>
                        <Breadcrumb items={breadcrumbItems} />
                        <Breadcrumb items={breadcrumbItems} separator=">" />
                        <Breadcrumb items={longBreadcrumb} />
                        <Breadcrumb items={longBreadcrumb} maxItems={4} />
                        <Breadcrumb items={iconBreadcrumb} />
                        <Breadcrumb items={breadcrumbItems} showRoot={false} />
                    </ShowcaseSection>
                );

            case 'pagination':
                return (
                    <ShowcaseSection title="Pagination" onOpenEditor={onOpenEditor}>
                        <div className="showcase-group">
                            <p className="showcase-label">Default — page {paginationPage} of 10</p>
                            <Pagination
                                totalPages={10}
                                currentPage={paginationPage}
                                onPageChange={setPaginationPage}
                            />
                        </div>
                        <div className="showcase-group">
                            <p className="showcase-label">Many pages — page {paginationPage2} of 50</p>
                            <Pagination
                                totalPages={50}
                                currentPage={paginationPage2}
                                onPageChange={setPaginationPage2}
                                siblingCount={2}
                            />
                        </div>
                        <div className="showcase-group">
                            <p className="showcase-label">No first/last buttons — page {paginationPage3} of 8</p>
                            <Pagination
                                totalPages={8}
                                currentPage={paginationPage3}
                                onPageChange={setPaginationPage3}
                                showFirstLast={false}
                            />
                        </div>
                        <div className="showcase-group">
                            <p className="showcase-label">No prev/next buttons</p>
                            <Pagination
                                totalPages={6}
                                currentPage={3}
                                onPageChange={() => { }}
                                showPrevNext={false}
                            />
                        </div>
                        <div className="showcase-group">
                            <p className="showcase-label">Disabled</p>
                            <Pagination
                                totalPages={10}
                                currentPage={4}
                                onPageChange={() => { }}
                                disabled
                            />
                        </div>
                    </ShowcaseSection>
                );

            case 'stepper':
                const steps: StepperStep[] = [
                    { id: '1', label: 'Account' },
                    { id: '2', label: 'Profile' },
                    { id: '3', label: 'Review' },
                ];
                return (
                    <ShowcaseSection title="Stepper" onOpenEditor={onOpenEditor}>
                        <Stepper steps={steps} currentStep={1} />
                        <Stepper steps={steps} currentStep={1} orientation="vertical" />
                    </ShowcaseSection>
                );

            case 'dialog':
                return (
                    <ShowcaseSection title="Dialog" onOpenEditor={onOpenEditor}>
                        <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
                        <Dialog
                            isOpen={isDialogOpen}
                            onClose={() => setIsDialogOpen(false)}
                            title="Dialog Title"
                        >
                            <p>This is a dialog component with customizable content.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <Button variant="outlined" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button tone="primary" onClick={() => setIsDialogOpen(false)}>Confirm</Button>
                            </div>
                        </Dialog>
                    </ShowcaseSection>
                );

            case 'drawer':
                return (
                    <ShowcaseSection title="Drawer" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row">
                            <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
                        </div>
                        <Drawer
                            isOpen={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                            title="Drawer Title"
                            position="right"
                        >
                            <p>This is a drawer component that slides in from the side.</p>
                        </Drawer>
                    </ShowcaseSection>
                );

            case 'popover':
                return (
                    <ShowcaseSection title="Popover" onOpenEditor={onOpenEditor}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="showcase-row">
                                <Popover trigger={<Button>Top</Button>} position="top">
                                    <div style={{ padding: '0.5rem' }}>Top · center</div>
                                </Popover>
                                <Popover trigger={<Button>Top Start</Button>} position="top" align="start">
                                    <div style={{ padding: '0.5rem' }}>Top · start</div>
                                </Popover>
                                <Popover trigger={<Button>Top End</Button>} position="top" align="end">
                                    <div style={{ padding: '0.5rem' }}>Top · end</div>
                                </Popover>
                            </div>
                            <div className="showcase-row">
                                <Popover trigger={<Button>Bottom</Button>} position="bottom">
                                    <div style={{ padding: '0.5rem' }}>Bottom · center</div>
                                </Popover>
                                <Popover trigger={<Button>Bottom Start</Button>} position="bottom" align="start">
                                    <div style={{ padding: '0.5rem' }}>Bottom · start</div>
                                </Popover>
                                <Popover trigger={<Button>Bottom End</Button>} position="bottom" align="end">
                                    <div style={{ padding: '0.5rem' }}>Bottom · end</div>
                                </Popover>
                            </div>
                            <div className="showcase-row">
                                <Popover trigger={<Button>Left</Button>} position="left">
                                    <div style={{ padding: '0.5rem' }}>Left · center</div>
                                </Popover>
                                <Popover trigger={<Button>Left Start</Button>} position="left" align="start">
                                    <div style={{ padding: '0.5rem' }}>Left · start</div>
                                </Popover>
                                <Popover trigger={<Button>Left End</Button>} position="left" align="end">
                                    <div style={{ padding: '0.5rem' }}>Left · end</div>
                                </Popover>
                                <Popover trigger={<Button>Right</Button>} position="right">
                                    <div style={{ padding: '0.5rem' }}>Right · center</div>
                                </Popover>
                                <Popover trigger={<Button>Right Start</Button>} position="right" align="start">
                                    <div style={{ padding: '0.5rem' }}>Right · start</div>
                                </Popover>
                                <Popover trigger={<Button>Right End</Button>} position="right" align="end">
                                    <div style={{ padding: '0.5rem' }}>Right · end</div>
                                </Popover>
                            </div>
                            <div className="showcase-row">
                                <Popover
                                    trigger={<Button variant="outlined">Rich Popover</Button>}
                                    position="bottom"
                                >
                                    <div style={{ padding: '0.75rem 1rem', minWidth: '200px' }}>
                                        <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Popover title</strong>
                                        <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem' }}>This popover has richer content with multiple elements.</p>
                                        <Button size="sm">Action</Button>
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </ShowcaseSection>
                );

            case 'tooltip':
                return (
                    <ShowcaseSection title="Tooltip" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row">
                            <Tooltip content="Top" position="top"><Button>Top</Button></Tooltip>
                            <Tooltip content="Top start" position="top-start"><Button>Top Start</Button></Tooltip>
                            <Tooltip content="Top end" position="top-end"><Button>Top End</Button></Tooltip>
                        </div>
                        <div className="showcase-row">
                            <Tooltip content="Bottom" position="bottom"><Button>Bottom</Button></Tooltip>
                            <Tooltip content="Bottom start" position="bottom-start"><Button>Bottom Start</Button></Tooltip>
                            <Tooltip content="Bottom end" position="bottom-end"><Button>Bottom End</Button></Tooltip>
                        </div>
                        <div className="showcase-row">
                            <Tooltip content="Left" position="left"><Button>Left</Button></Tooltip>
                            <Tooltip content="Left start" position="left-start"><Button>Left Start</Button></Tooltip>
                            <Tooltip content="Left end" position="left-end"><Button>Left End</Button></Tooltip>
                        </div>
                        <div className="showcase-row">
                            <Tooltip content="Right" position="right"><Button>Right</Button></Tooltip>
                            <Tooltip content="Right start" position="right-start"><Button>Right Start</Button></Tooltip>
                            <Tooltip content="Right end" position="right-end"><Button>Right End</Button></Tooltip>
                        </div>
                        <div className="showcase-row">
                            <Tooltip content="This is a longer tooltip message that wraps across multiple lines to show max-width behavior." position="bottom">
                                <Button variant="outlined">Long content</Button>
                            </Tooltip>
                        </div>
                    </ShowcaseSection>
                );

            case 'toast':
                return (
                    <ShowcaseSection title="Toast" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row">
                            <Button onClick={() => toast.toast('This is an info message')}>Info</Button>
                            <Button onClick={() => toast.success('Operation successful!')}>Success</Button>
                            <Button onClick={() => toast.warning('Warning message')}>Warning</Button>
                            <Button onClick={() => toast.error('Error occurred')}>Error</Button>
                        </div>
                    </ShowcaseSection>
                );

            case 'icon':
                return (
                    <ShowcaseSection title="Icon" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row">
                            <Icons.Check size="24px" />
                            <Icons.X size="24px" />
                            <Icons.ChevronDown size="24px" />
                            <Icons.Menu size="24px" />
                            <Icons.Search size="24px" />
                            <Icons.Settings size="24px" />
                            <Icons.User size="24px" />
                            <Icons.Home size="24px" />
                            <Icons.Heart size="24px" />
                            <Icons.Star size="24px" />
                            <Icons.Info size="24px" />
                            <Icons.AlertCircle size="24px" />
                        </div>
                    </ShowcaseSection>
                );

            case 'avatar':
                return (
                    <ShowcaseSection title="Avatar" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row">
                            <Avatar name="John Doe" />
                            <Avatar name="Jane Smith" status="online" showStatus />
                            <Avatar name="Bob Wilson" status="offline" showStatus />
                            <Avatar name="Alice Brown" status="away" showStatus />
                            <Avatar name="Charlie Davis" status="busy" showStatus />
                        </div>
                        <div className="showcase-row">
                            <Avatar name="Small" size="small" />
                            <Avatar name="Medium" size="medium" />
                            <Avatar name="Large" size="large" />
                        </div>
                        <div className="showcase-row">
                            <Avatar name="Square Shape" shape="square" />
                            <Avatar name="With Image" src="https://i.pravatar.cc/150?img=1" />
                            <Avatar name="Fallback" src="https://broken.url/img.png" />
                            <Avatar />
                        </div>
                    </ShowcaseSection>
                );

            case 'badge':
                return (
                    <ShowcaseSection title="Badge" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row">
                            <Badge>Default</Badge>
                            <Badge color="primary">Primary</Badge>
                            <Badge color="success">Success</Badge>
                            <Badge color="warning">Warning</Badge>
                            <Badge color="danger">Danger</Badge>
                            <Badge color="info">Info</Badge>
                        </div>
                        <div className="showcase-row">
                            <Badge variant="solid">Solid</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="soft">Soft</Badge>
                        </div>
                    </ShowcaseSection>
                );

            case 'spinner':
                return (
                    <ShowcaseSection title="Spinner" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row">
                            <Spinner size="small" />
                            <Spinner size="medium" />
                            <Spinner size="large" />
                        </div>
                    </ShowcaseSection>
                );

            case 'progress':
                return (
                    <ShowcaseSection title="Progress" onOpenEditor={onOpenEditor}>
                        {/* Interactive slider to drive value */}
                        <div className="showcase-group">
                            <p className="showcase-label">Live value — {progressValue}%</p>
                            <input
                                type="range" min={0} max={100} value={progressValue}
                                onChange={e => setProgressValue(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>

                        {/* Bar sizes */}
                        <div className="showcase-group">
                            <p className="showcase-label">Bar sizes</p>
                            <Progress value={progressValue} size="sm" label="Small" showValue />
                            <Progress value={progressValue} size="md" label="Medium" showValue />
                            <Progress value={progressValue} size="lg" label="Large" showValue />
                        </div>

                        {/* Colours */}
                        <div className="showcase-group">
                            <p className="showcase-label">Colours</p>
                            <Progress value={progressValue} color="primary" label="Primary" showValue />
                            <Progress value={progressValue} color="success" label="Success" showValue />
                            <Progress value={progressValue} color="warning" label="Warning" showValue />
                            <Progress value={progressValue} color="danger" label="Danger" showValue />
                        </div>

                        {/* Striped + animated */}
                        <div className="showcase-group">
                            <p className="showcase-label">Striped &amp; animated</p>
                            <Progress value={progressValue} striped label="Striped" showValue />
                            <Progress value={progressValue} striped animated color="success" label="Striped + animated" showValue />
                        </div>

                        {/* Indeterminate bar */}
                        <div className="showcase-group">
                            <p className="showcase-label">Indeterminate bar</p>
                            <Progress indeterminate />
                            <Progress indeterminate color="success" size="lg" />
                        </div>

                        {/* Circle variant */}
                        <div className="showcase-group">
                            <p className="showcase-label">Circle</p>
                            <div className="showcase-row" style={{ justifyContent: 'flex-start' }}>
                                <Progress variant="circle" value={progressValue} size="sm" showValue />
                                <Progress variant="circle" value={progressValue} size="md" showValue label="Upload" />
                                <Progress variant="circle" value={progressValue} size="lg" color="success" showValue label="Complete" />
                                <Progress variant="circle" indeterminate size="md" />
                            </div>
                        </div>
                    </ShowcaseSection>
                );

            case 'divider':
                return (
                    <ShowcaseSection title="Divider" onOpenEditor={onOpenEditor}>
                        <div className="showcase-col">
                            <Divider />
                            <Divider label="OR" />
                            <Divider variant="dashed" />
                            <Divider variant="dotted" label="Section" />
                        </div>
                    </ShowcaseSection>
                );

            case 'card':
                return (
                    <ShowcaseSection title="Card" onOpenEditor={onOpenEditor}>

                        {/* ── Media cards ── */}
                        <div className="showcase-group">
                            <p className="showcase-label">Media cards</p>
                            <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
                                <Card variant="elevated" padding="none" style={{ width: 280 }}>
                                    <Card.Media src="https://picsum.photos/seed/arch/560/320" alt="Architecture" height={160} />
                                    <Card.Content>
                                        <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Architecture</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>A stunning piece of modern architecture photographed at golden hour.</div>
                                    </Card.Content>
                                    <Card.Actions align="space-between">
                                        <Button size="sm" variant="text">Share</Button>
                                        <Button size="sm">Learn more</Button>
                                    </Card.Actions>
                                </Card>

                                <Card variant="outlined" padding="none" style={{ width: 280 }}>
                                    <Card.Media src="https://picsum.photos/seed/nature/560/320" alt="Nature" height={160} />
                                    <Card.Content>
                                        <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Into the wild</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Breathtaking scenery from the untouched wilderness.</div>
                                    </Card.Content>
                                    <Card.Actions>
                                        <Button size="sm" variant="outlined">Save</Button>
                                        <Button size="sm">Explore</Button>
                                    </Card.Actions>
                                </Card>

                                <Card variant="elevated" padding="none" hoverable clickable style={{ width: 280 }}>
                                    <Card.Media src="https://picsum.photos/seed/city/560/320" alt="City" aspectRatio="16/9" />
                                    <Card.Content>
                                        <div style={{ marginBottom: '0.5rem' }}><Badge color="primary">Travel</Badge></div>
                                        <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>City lights</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hoverable &amp; clickable card with aspect-ratio media.</div>
                                    </Card.Content>
                                </Card>

                                <Card variant="elevated" padding="none" style={{ width: 280, position: 'relative' }}>
                                    <div style={{ position: 'relative' }}>
                                        <Card.Media src="https://picsum.photos/seed/forest/560/320" alt="Forest" height={160} />
                                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                                            <Menu.Trigger
                                                menu={
                                                    <Menu items={[
                                                        { id: 'save', label: 'Save', icon: <Icons.Heart size="16px" />, onClick: () => { } },
                                                        { id: 'share', label: 'Share', icon: <Icons.User size="16px" />, onClick: () => { } },
                                                        { id: 'divider', label: '', divider: true },
                                                        { id: 'remove', label: 'Remove', icon: <Icons.X size="16px" />, danger: true, onClick: () => { } },
                                                    ]} />
                                                }
                                            >
                                                <Button
                                                    size="sm"
                                                    variant="text"
                                                    style={{
                                                        background: 'rgba(0,0,0,0.45)',
                                                        color: '#fff',
                                                        borderRadius: 'var(--radius-full, 9999px)',
                                                        backdropFilter: 'blur(4px)',
                                                        padding: '0.25rem',
                                                        minWidth: 0,
                                                        lineHeight: 1,
                                                    }}
                                                    aria-label="Card options"
                                                >
                                                    <Icons.MoreVertical size="18px" />
                                                </Button>
                                            </Menu.Trigger>
                                        </div>
                                    </div>
                                    <Card.Content>
                                        <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Into the forest</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Card with an image overlay action menu.</div>
                                    </Card.Content>
                                    <Card.Actions align="space-between">
                                        <Button size="sm" variant="text">Share</Button>
                                        <Button size="sm">Explore</Button>
                                    </Card.Actions>
                                </Card>
                            </div>
                        </div>

                        {/* ── Profile / user cards ── */}
                        <div className="showcase-group">
                            <p className="showcase-label">Profile cards</p>
                            <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
                                <Card variant="elevated" padding="none" style={{ width: 260, textAlign: 'center' }}>
                                    <Card.Media src="https://picsum.photos/seed/portrait1/520/260" alt="Cover" height={90} />
                                    <div style={{ marginTop: '-2rem', padding: '0 1rem 0' }}>
                                        <div style={{ display: 'inline-block', borderRadius: '50%', border: '3px solid var(--surface-raised)' }}>
                                            <Avatar name="Alice Johnson" size="large" />
                                        </div>
                                    </div>
                                    <Card.Content>
                                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>Alice Johnson</div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Senior Designer · San Francisco</div>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.875rem' }}>
                                            <div><strong>128</strong><br /><span style={{ color: 'var(--text-muted)' }}>Posts</span></div>
                                            <div><strong>4.2k</strong><br /><span style={{ color: 'var(--text-muted)' }}>Followers</span></div>
                                            <div><strong>310</strong><br /><span style={{ color: 'var(--text-muted)' }}>Following</span></div>
                                        </div>
                                    </Card.Content>
                                    <Card.Actions align="center">
                                        <Button size="sm">Follow</Button>
                                        <Button size="sm" variant="outlined">Message</Button>
                                    </Card.Actions>
                                </Card>

                                <Card variant="outlined" padding="none" style={{ width: 300 }}>
                                    <Card.Header
                                        avatar={<Avatar name="Bob Martinez" size="medium" status="online" showStatus />}
                                        action={<Button size="sm" variant="text"><Icons.Settings size="16px" /></Button>}
                                    >
                                        <div style={{ fontWeight: 600 }}>Bob Martinez</div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>UX Designer · Available</div>
                                    </Card.Header>
                                    <Card.Content>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                                            Crafting delightful user experiences one pixel at a time.
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                            {['Figma', 'React', 'Design Systems'].map(tag => (
                                                <Badge key={tag} color="info">{tag}</Badge>
                                            ))}
                                        </div>
                                    </Card.Content>
                                    <Card.Actions align="space-between">
                                        <Button size="sm" variant="text">View profile</Button>
                                        <Button size="sm">Connect</Button>
                                    </Card.Actions>
                                </Card>
                            </div>
                        </div>

                        {/* ── Stat / metric cards ── */}
                        <div className="showcase-group">
                            <p className="showcase-label">Stat cards</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {[
                                    { label: 'Total Revenue', value: '$48,295', delta: '+12.5%', color: 'success' as const, icon: '💰' },
                                    { label: 'Active Users', value: '3,842', delta: '+8.1%', color: 'primary' as const, icon: '👥' },
                                    { label: 'Open Tickets', value: '27', delta: '-3', color: 'warning' as const, icon: '🎫' },
                                    { label: 'Error Rate', value: '0.4%', delta: '-0.2%', color: 'danger' as const, icon: '⚠️' },
                                ].map(stat => (
                                    <Card key={stat.label} variant="elevated" hoverable style={{ width: 200, minWidth: 160 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>{stat.label}</div>
                                                <div style={{ fontSize: '1.625rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</div>
                                            </div>
                                            <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                                        </div>
                                        <div style={{ marginTop: '0.75rem' }}><Badge color={stat.color}>{stat.delta}</Badge></div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* ── Variants ── */}
                        <div className="showcase-group">
                            <p className="showcase-label">Variants</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                <Card variant="elevated" style={{ width: 180 }}>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Elevated</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Default shadow</div>
                                </Card>
                                <Card variant="outlined" style={{ width: 180 }}>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Outlined</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Border only</div>
                                </Card>
                                <Card variant="filled" style={{ width: 180 }}>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Filled</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sunken surface</div>
                                </Card>
                            </div>
                        </div>

                    </ShowcaseSection>
                );

            case 'menu':
                const menuItems: MenuItem[] = [
                    { id: '1', label: 'Profile', icon: <Icons.User />, onClick: () => alert('Profile') },
                    { id: '2', label: 'Settings', icon: <Icons.Settings />, onClick: () => alert('Settings') },
                    { id: '3', label: 'Divider', divider: true },
                    { id: '4', label: 'Logout', icon: <Icons.X />, danger: true, onClick: () => alert('Logout') },
                ];
                return (
                    <ShowcaseSection title="Menu" onOpenEditor={onOpenEditor}>
                        <Menu.Trigger menu={<Menu items={menuItems} />}>
                            <Button>Open Menu</Button>
                        </Menu.Trigger>
                    </ShowcaseSection>
                );

            case 'table': {
                type Employee = {
                    id: number; name: string; email: string;
                    department: string; role: string;
                    status: 'active' | 'away' | 'inactive';
                    salary: number; joined: string;
                };
                const employees: Employee[] = [
                    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', role: 'Senior Engineer', status: 'active', salary: 95000, joined: '2021-03-15' },
                    { id: 2, name: 'Bob Martinez', email: 'bob@company.com', department: 'Design', role: 'UX Designer', status: 'active', salary: 82000, joined: '2020-07-22' },
                    { id: 3, name: 'Carol Williams', email: 'carol@company.com', department: 'Marketing', role: 'Marketing Lead', status: 'away', salary: 78000, joined: '2019-11-08' },
                    { id: 4, name: 'David Chen', email: 'david@company.com', department: 'Engineering', role: 'Junior Engineer', status: 'active', salary: 68000, joined: '2023-01-20' },
                    { id: 5, name: 'Eva Rosenberg', email: 'eva@company.com', department: 'HR', role: 'HR Manager', status: 'active', salary: 75000, joined: '2018-05-14' },
                    { id: 6, name: 'Frank Liu', email: 'frank@company.com', department: 'Engineering', role: 'Staff Engineer', status: 'inactive', salary: 105000, joined: '2017-09-03' },
                    { id: 7, name: 'Grace Park', email: 'grace@company.com', department: 'Design', role: 'Product Designer', status: 'active', salary: 88000, joined: '2022-04-11' },
                    { id: 8, name: 'Henry Okafor', email: 'henry@company.com', department: 'Finance', role: 'Finance Analyst', status: 'active', salary: 71000, joined: '2021-08-30' },
                    { id: 9, name: 'Iris Nakamura', email: 'iris@company.com', department: 'Marketing', role: 'Content Strategist', status: 'away', salary: 65000, joined: '2020-02-17' },
                    { id: 10, name: 'James Brown', email: 'james@company.com', department: 'Engineering', role: 'DevOps Engineer', status: 'active', salary: 92000, joined: '2019-06-25' },
                    { id: 11, name: 'Kira Patel', email: 'kira@company.com', department: 'HR', role: 'Recruiter', status: 'active', salary: 61000, joined: '2022-10-05' },
                    { id: 12, name: 'Leo Fernandez', email: 'leo@company.com', department: 'Engineering', role: 'QA Engineer', status: 'inactive', salary: 72000, joined: '2020-12-19' },
                    { id: 13, name: 'Mia Thompson', email: 'mia@company.com', department: 'Finance', role: 'CFO', status: 'active', salary: 145000, joined: '2016-03-01' },
                    { id: 14, name: 'Noah Singh', email: 'noah@company.com', department: 'Engineering', role: 'Principal Engineer', status: 'active', salary: 120000, joined: '2015-07-12' },
                    { id: 15, name: 'Olivia Turner', email: 'olivia@company.com', department: 'Design', role: 'Design Lead', status: 'active', salary: 98000, joined: '2018-11-22' },
                    { id: 16, name: 'Peter Wang', email: 'peter@company.com', department: 'Marketing', role: 'Growth Manager', status: 'active', salary: 85000, joined: '2021-05-09' },
                    { id: 17, name: 'Quinn Adams', email: 'quinn@company.com', department: 'Engineering', role: 'ML Engineer', status: 'active', salary: 110000, joined: '2020-09-14' },
                    { id: 18, name: 'Rachel Kim', email: 'rachel@company.com', department: 'HR', role: 'L&D Specialist', status: 'away', salary: 67000, joined: '2022-07-28' },
                    { id: 19, name: 'Samuel Moore', email: 'samuel@company.com', department: 'Finance', role: 'Senior Accountant', status: 'active', salary: 79000, joined: '2019-04-03' },
                    { id: 20, name: 'Tina Volkov', email: 'tina@company.com', department: 'Engineering', role: 'Frontend Engineer', status: 'active', salary: 88000, joined: '2023-03-20' },
                ];

                const baseColumns: Column<Employee>[] = [
                    { key: 'name', header: 'Name', accessor: 'name', sortable: true },
                    { key: 'email', header: 'Email', accessor: 'email', sortable: true },
                    { key: 'department', header: 'Department', accessor: 'department', sortable: true },
                    { key: 'role', header: 'Role', accessor: 'role' },
                ];

                const statusColor: Record<string, 'success' | 'warning' | 'danger'> = {
                    active: 'success', away: 'warning', inactive: 'danger',
                };

                const fullColumns: Column<Employee>[] = [
                    ...baseColumns,
                    {
                        key: 'status', header: 'Status', accessor: 'status',
                        render: (v: string) => <Badge color={statusColor[v]}>{v}</Badge>,
                    },
                    {
                        key: 'salary', header: 'Salary', accessor: 'salary', align: 'right', sortable: true,
                        render: (v: number) => `$${v.toLocaleString()}`,
                    },
                    { key: 'joined', header: 'Joined', accessor: 'joined', sortable: true },
                ];

                const top6 = employees.slice(0, 6);
                const top6Salary = top6.reduce((s, e) => s + e.salary, 0);

                return (
                    <ShowcaseSection title="Table" onOpenEditor={onOpenEditor}>

                        {/* ── Variants ── */}
                        <p style={{ margin: '0 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Variants</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <Table columns={baseColumns} data={employees.slice(0, 5)} sortable hoverable />
                            <Table columns={baseColumns} data={employees.slice(0, 5)} variant="striped" sortable hoverable />
                            <Table columns={baseColumns} data={employees.slice(0, 5)} variant="bordered" sortable hoverable />
                        </div>

                        {/* ── Full-featured ── */}
                        <p style={{ margin: '2rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            Full-featured — toolbar · filter · column toggler · pagination · selection · expandable · painter
                        </p>
                        <Table<Employee>
                            columns={fullColumns}
                            data={employees}
                            rowKey="id"
                            variant="striped"
                            hoverable
                            sortable
                            selectable
                            filterable
                            showToolbar
                            showPagination
                            pageSize={8}
                            pageSizeOptions={[5, 8, 15, 20]}
                            expandable
                            renderExpanded={(row) => (
                                <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', fontSize: '0.875rem' }}>
                                    <div><span style={{ color: 'var(--text-muted)' }}>ID</span><br /><strong>#{row.id}</strong></div>
                                    <div><span style={{ color: 'var(--text-muted)' }}>Email</span><br /><strong>{row.email}</strong></div>
                                    <div><span style={{ color: 'var(--text-muted)' }}>Salary</span><br /><strong>${row.salary.toLocaleString()} / yr</strong></div>
                                    <div><span style={{ color: 'var(--text-muted)' }}>Joined</span><br /><strong>{row.joined}</strong></div>
                                    <div><span style={{ color: 'var(--text-muted)' }}>Department</span><br /><strong>{row.department}</strong></div>
                                </div>
                            )}
                            toolbarActions={
                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                                    {employees.filter(e => e.status === 'active').length} active · {employees.filter(e => e.status === 'away').length} away · {employees.filter(e => e.status === 'inactive').length} inactive
                                </span>
                            }
                            getRowStyle={(row) => row.status === 'inactive' ? { opacity: 0.55 } : undefined}
                        />

                        {/* ── Footer / totals ── */}
                        <p style={{ margin: '2rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>With footer row (totals)</p>
                        <Table<Employee>
                            columns={[
                                { key: 'name', header: 'Name', accessor: 'name' },
                                { key: 'department', header: 'Department', accessor: 'department' },
                                { key: 'role', header: 'Role', accessor: 'role' },
                                {
                                    key: 'salary', header: 'Salary', accessor: 'salary', align: 'right',
                                    render: (v: number) => `$${v.toLocaleString()}`
                                },
                            ]}
                            data={top6}
                            variant="bordered"
                            footerRow={
                                <>
                                    <td colSpan={3} style={{ padding: '0.5rem 1rem', fontWeight: 700 }}>
                                        Total · {top6.length} employees
                                    </td>
                                    <td style={{ textAlign: 'right', padding: '0.5rem 1rem', fontWeight: 700 }}>
                                        ${top6Salary.toLocaleString()}
                                    </td>
                                </>
                            }
                        />

                        {/* ── Loading skeleton ── */}
                        <p style={{ margin: '2rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Loading skeleton</p>
                        <Table columns={baseColumns} data={[]} loading pageSize={4} />

                    </ShowcaseSection>
                );
            }

            case 'lightbox': {
                const lightboxImages: LightboxImage[] = [
                    { src: 'https://picsum.photos/seed/a/1200/800', alt: 'Mountain landscape', caption: 'Mountain landscape at dawn' },
                    { src: 'https://picsum.photos/seed/b/1200/800', alt: 'Forest path', caption: 'A quiet path through the forest' },
                    { src: 'https://picsum.photos/seed/c/1200/800', alt: 'Ocean sunset', caption: 'Sunset over the ocean' },
                    { src: 'https://picsum.photos/seed/d/1200/800', alt: 'City skyline', caption: 'City skyline at night' },
                    { src: 'https://picsum.photos/seed/e/1200/800', alt: 'Desert dunes', caption: 'Sand dunes stretching to the horizon' },
                ];
                return (
                    <ShowcaseSection title="Lightbox" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                            {lightboxImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setLightboxIndex(i); setIsLightboxOpen(true); }}
                                    style={{ padding: 0, border: 'none', cursor: 'pointer', borderRadius: '6px', overflow: 'hidden' }}
                                    aria-label={`Open ${img.alt}`}
                                >
                                    <img
                                        src={`https://picsum.photos/seed/${['a', 'b', 'c', 'd', 'e'][i]}/160/100`}
                                        alt={img.alt}
                                        style={{ display: 'block', width: 160, height: 100, objectFit: 'cover' }}
                                    />
                                </button>
                            ))}
                        </div>
                        <Lightbox
                            images={lightboxImages}
                            isOpen={isLightboxOpen}
                            initialIndex={lightboxIndex}
                            onClose={() => setIsLightboxOpen(false)}
                        />
                    </ShowcaseSection>
                );
            }

            case 'datepicker': {
                const today = new Date();
                const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);
                return (
                    <ShowcaseSection title="Date Picker" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                            <DatePicker
                                label="Pick a date"
                                value={datePickerValue}
                                onChange={setDatePickerValue}
                                placeholder="Select a date"
                            />
                            <DatePicker
                                label="With helper text"
                                value={null}
                                onChange={() => { }}
                                helperText="Choose your preferred date"
                            />
                            <DatePicker
                                label="With error"
                                value={null}
                                onChange={() => { }}
                                error="Date is required"
                            />
                            <DatePicker
                                label="Min/Max range"
                                value={datePickerRangeValue}
                                onChange={setDatePickerRangeValue}
                                minDate={today}
                                maxDate={nextWeek}
                                helperText="Only next 7 days available"
                            />
                            <DatePicker
                                label="Disabled"
                                value={new Date(2024, 11, 25)}
                                onChange={() => { }}
                                disabled
                            />
                        </div>
                    </ShowcaseSection>
                );
            }

            case 'timepicker': {
                return (
                    <ShowcaseSection title="Time Picker" onOpenEditor={onOpenEditor}>
                        <div className="showcase-row" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                            <TimePicker
                                label="24-hour clock"
                                value={timePickerValue}
                                onChange={setTimePickerValue}
                                placeholder="Select time"
                            />
                            <TimePicker
                                label="12-hour clock"
                                value={timePickerAMPM}
                                onChange={setTimePickerAMPM}
                                hourCycle={12}
                                placeholder="Select time"
                            />
                            <TimePicker
                                label="With seconds"
                                value={timePickerSeconds}
                                onChange={setTimePickerSeconds}
                                showSeconds
                                placeholder="HH:MM:SS"
                            />
                            <TimePicker
                                label="5-min steps"
                                value={null}
                                onChange={() => { }}
                                minuteStep={5}
                                helperText="Minutes snap to 5-min intervals"
                            />
                            <TimePicker
                                label="With error"
                                value={null}
                                onChange={() => { }}
                                error="Time is required"
                            />
                            <TimePicker
                                label="Disabled"
                                value={{ hours: 9, minutes: 30 }}
                                onChange={() => { }}
                                disabled
                            />
                        </div>
                    </ShowcaseSection>
                );
            }

            case 'carousel': {
                const cardColors = [
                    { bg: 'var(--intent-primary)', label: 'Slide 1' },
                    { bg: 'var(--intent-success)', label: 'Slide 2' },
                    { bg: 'var(--intent-warning)', label: 'Slide 3' },
                    { bg: 'var(--intent-danger)', label: 'Slide 4' },
                    { bg: 'var(--intent-secondary)', label: 'Slide 5' },
                ];
                const makeSlide = (color: string, label: string) => (
                    <div style={{
                        background: color,
                        height: '200px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                    }}>
                        {label}
                    </div>
                );
                return (
                    <ShowcaseSection title="Carousel" onOpenEditor={onOpenEditor}>
                        <div className="showcase-col">
                            <div style={{ maxWidth: '480px' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Single slide</p>
                                <Carousel showArrows showDots>
                                    {cardColors.map(({ bg, label }) => makeSlide(bg, label))}
                                </Carousel>
                            </div>
                            <div style={{ maxWidth: '600px' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Multi-slide (2 per view)</p>
                                <Carousel slidesPerView={2} gap={12} showDots>
                                    {cardColors.map(({ bg, label }) => makeSlide(bg, label))}
                                </Carousel>
                            </div>
                            <div style={{ maxWidth: '480px' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>AutoPlay (4 s)</p>
                                <Carousel autoPlay autoPlayInterval={4000} showDots>
                                    {cardColors.map(({ bg, label }) => makeSlide(bg, label))}
                                </Carousel>
                            </div>
                        </div>
                    </ShowcaseSection>
                );
            }

            default:
                return (
                    <div className="showcase-empty">
                        <p>Select a component to see its showcase</p>
                    </div>
                );

            case 'stack':
                return (
                    <ShowcaseSection title="Stack" onOpenEditor={onOpenEditor}>
                        <p style={{ margin: '0 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Vertical (default)</p>
                        <Stack gap="sm" style={{ maxWidth: 320 }}>
                            <Card variant="outlined"><Card.Content><strong>Item 1</strong> — vertical stack, gap sm</Card.Content></Card>
                            <Card variant="outlined"><Card.Content><strong>Item 2</strong></Card.Content></Card>
                            <Card variant="outlined"><Card.Content><strong>Item 3</strong></Card.Content></Card>
                        </Stack>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Horizontal row</p>
                        <Stack direction="row" gap="md" align="center">
                            <Button>Button A</Button>
                            <Button variant="outlined">Button B</Button>
                            <Button variant="text">Button C</Button>
                            <Badge color="success">New</Badge>
                            <Spinner size="small" />
                        </Stack>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Row with wrap</p>
                        <Stack direction="row" gap="sm" wrap style={{ maxWidth: 400 }}>
                            {['React', 'TypeScript', 'Vite', 'SCSS Modules', 'Design Systems', 'CSS Variables', 'Accessible'].map(tag => (
                                <Badge key={tag} color="primary">{tag}</Badge>
                            ))}
                        </Stack>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>With dividers — vertical</p>
                        <Stack dividers gap="none" style={{ maxWidth: 320 }}>
                            <div style={{ padding: '0.5rem 0' }}>Section A</div>
                            <div style={{ padding: '0.5rem 0' }}>Section B</div>
                            <div style={{ padding: '0.5rem 0' }}>Section C</div>
                        </Stack>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>With dividers — horizontal</p>
                        <Stack direction="row" dividers gap="md" align="center">
                            <span>Home</span>
                            <span>About</span>
                            <span>Blog</span>
                            <span>Contact</span>
                        </Stack>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>justify + align</p>
                        <Stack direction="row" gap="md" justify="space-between" align="flex-end"
                            style={{ background: 'var(--surface-sunken)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                            <Stack gap="xs">
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total</span>
                                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>$1,240</span>
                            </Stack>
                            <Stack gap="xs" align="flex-end">
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due date</span>
                                <span style={{ fontWeight: 600 }}>Apr 30, 2026</span>
                            </Stack>
                            <Button size="sm">Pay now</Button>
                        </Stack>
                    </ShowcaseSection>
                );

            case 'grid':
                return (
                    <ShowcaseSection title="Grid" onOpenEditor={onOpenEditor}>
                        <p style={{ margin: '0 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>3-column equal</p>
                        <Grid columns={3} gap="md">
                            {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map(name => (
                                <Card key={name} variant="outlined">
                                    <Card.Content>
                                        <div style={{ fontWeight: 600 }}>{name}</div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Grid item</div>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Grid>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Auto-fill responsive</p>
                        <Grid columns="repeat(auto-fill, minmax(160px, 1fr))" gap="sm">
                            {['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Qwik', 'Astro', 'Next.js'].map(name => (
                                <Card key={name} variant="filled">
                                    <Card.Content>
                                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{name}</div>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Grid>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Column spanning with Grid.Item</p>
                        <Grid columns={4} gap="md">
                            <Grid.Item colSpan={2}>
                                <Card variant="elevated" style={{ background: 'var(--intent-primary)' }}>
                                    <Card.Content><div style={{ color: '#fff', fontWeight: 700 }}>Spans 2 cols</div></Card.Content>
                                </Card>
                            </Grid.Item>
                            <Grid.Item>
                                <Card variant="outlined"><Card.Content>1 col</Card.Content></Card>
                            </Grid.Item>
                            <Grid.Item>
                                <Card variant="outlined"><Card.Content>1 col</Card.Content></Card>
                            </Grid.Item>
                            <Grid.Item colSpan={4}>
                                <Card variant="filled"><Card.Content><div style={{ fontWeight: 600 }}>Full width — spans 4 cols</div></Card.Content></Card>
                            </Grid.Item>
                        </Grid>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Asymmetric — 1fr 2fr 1fr</p>
                        <Grid columns="1fr 2fr 1fr" gap="md">
                            <Card variant="outlined"><Card.Content><div style={{ fontSize: '0.8125rem' }}>Sidebar</div></Card.Content></Card>
                            <Card variant="elevated"><Card.Content><div style={{ fontWeight: 600 }}>Main content (2fr)</div></Card.Content></Card>
                            <Card variant="outlined"><Card.Content><div style={{ fontSize: '0.8125rem' }}>Aside</div></Card.Content></Card>
                        </Grid>
                    </ShowcaseSection>
                );

            case 'container':
                return (
                    <ShowcaseSection title="Container" onOpenEditor={onOpenEditor}>
                        <p style={{ margin: '0 0 0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Max-width sizes</p>
                        <Stack gap="sm">
                            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                                <Container key={size} maxWidth={size} padding={false}>
                                    <div style={{
                                        background: 'var(--surface-sunken)',
                                        border: '1px dashed var(--border-primary)',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: '0.5rem 0.75rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '0.875rem',
                                    }}>
                                        <span style={{ fontWeight: 600 }}>{size}</span>
                                        <span style={{ color: 'var(--text-muted)' }}>
                                            {{ xs: '480px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px' }[size]}
                                        </span>
                                    </div>
                                </Container>
                            ))}
                        </Stack>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Centered content layout</p>
                        <div style={{ background: 'var(--surface-sunken)', padding: '1.5rem 0', borderRadius: 'var(--radius-md)' }}>
                            <Container maxWidth="sm">
                                <Stack gap="md">
                                    <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>Sign in to your account</div>
                                    <Input label="Email" placeholder="you@example.com" type="email" />
                                    <Input label="Password" placeholder="••••••••" type="password" />
                                    <Button style={{ width: '100%' }}>Sign in</Button>
                                    <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        Don't have an account? <a href="#" style={{ color: 'var(--intent-primary)' }}>Sign up</a>
                                    </div>
                                </Stack>
                            </Container>
                        </div>

                        <p style={{ margin: '1.5rem 0 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Custom padding</p>
                        <Container maxWidth="md" padding="2rem">
                            <Card variant="elevated">
                                <Card.Content>
                                    This Container has <code>padding="2rem"</code> on both sides and <code>maxWidth="md"</code> (768px).
                                </Card.Content>
                            </Card>
                        </Container>
                    </ShowcaseSection>
                );
        }
    };

    return <div className="component-showcase">{renderShowcase()}</div>;
}

interface ShowcaseSectionProps {
    title: string;
    children: React.ReactNode;
    onOpenEditor: () => void;
}

function ShowcaseSection({ title, children, onOpenEditor }: ShowcaseSectionProps) {
    return (
        <div className="showcase-section">
            <div className="showcase-header">
                <h1>{title}</h1>
                <Button size="sm" onClick={onOpenEditor}>
                    <Icons.Settings size="16px" />
                    <span style={{ marginLeft: '0.5rem' }}>Edit Theme</span>
                </Button>
            </div>
            <div className="showcase-content">
                {children}
            </div>
        </div>
    );
}
