# Steps Component

A comprehensive, accessible, and highly customizable Steps component for React applications using Shadcn conventions and Tailwind CSS. This component guides users through multi-step processes like wizards, forms, or workflows.

## Features

- ✅ **Flexible Orientation**: Horizontal and vertical layouts
- ✅ **Multiple Variants**: Solid and subtle visual styles
- ✅ **Size Options**: xs, sm, md, lg sizing
- ✅ **Controlled/Uncontrolled**: Supports both modes
- ✅ **Linear Progression**: Optional sequential step completion
- ✅ **Rich Content**: Icons, descriptions, and custom content
- ✅ **Navigation**: Built-in and custom navigation options
- ✅ **Accessibility**: Full keyboard navigation and ARIA attributes
- ✅ **Customizable**: Extensive styling customization options

## Installation

Make sure you have the required dependencies:

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react
```

The component uses these Shadcn utilities:
- `cn` function from `@/lib/utils`
- Tailwind CSS for styling
- Lucide React for icons

## Basic Usage

```tsx
import { Steps, Step, StepsCompleted } from "@/components/ui/steps"

function MyWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  
  return (
    <Steps
      step={currentStep}
      onStepChange={({ step }) => setCurrentStep(step)}
    >
      <Step title="Personal Info" description="Enter your details">
        <div>Step 1 content</div>
      </Step>
      
      <Step title="Payment" description="Billing information">
        <div>Step 2 content</div>
      </Step>
      
      <Step title="Confirmation" description="Review and submit">
        <div>Step 3 content</div>
      </Step>
      
      <StepsCompleted>
        <div>All steps completed!</div>
      </StepsCompleted>
    </Steps>
  )
}
```

## Components

### Steps (Main Container)

The main wrapper component that manages state and coordinates all child components.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Component size |
| `defaultStep` | `number` | `0` | Initial step (uncontrolled mode) |
| `step` | `number` | `undefined` | Current step (controlled mode) |
| `linear` | `boolean` | `false` | Enforce sequential completion |
| `onStepChange` | `(details: { step: number }) => void` | `undefined` | Step change callback |
| `onStepComplete` | `(step: number) => void` | `undefined` | Step completion callback |
| `className` | `string` | `undefined` | Additional CSS classes |

### Step

Individual step component containing title, description, icon, and content.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Step title |
| `description` | `string` | `undefined` | Optional description |
| `icon` | `ReactNode` | `undefined` | Custom icon |
| `isCompleted` | `boolean` | `false` | Completion status |
| `disabled` | `boolean` | `false` | Disable interaction |
| `children` | `ReactNode` | `undefined` | Step content |
| `className` | `string` | `undefined` | Additional CSS classes |

### StepsCompleted

Component shown when all steps are completed.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Completion content |
| `className` | `string` | `undefined` | Additional CSS classes |

### StepsNavigation

Optional navigation component with Previous/Next buttons.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Custom navigation content |
| `className` | `string` | `undefined` | Additional CSS classes |

## Examples

### 1. Linear Steps (Sequential)

```tsx
function LinearSteps() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(new Set())

  return (
    <Steps
      step={currentStep}
      onStepChange={({ step }) => setCurrentStep(step)}
      linear={true}
    >
      <Step
        title="Account Setup"
        description="Create your profile"
        isCompleted={completedSteps.has(0)}
      >
        <AccountForm onComplete={() => markComplete(0)} />
      </Step>
      
      <Step
        title="Verification"
        description="Verify your email"
        isCompleted={completedSteps.has(1)}
      >
        <VerificationForm onComplete={() => markComplete(1)} />
      </Step>
    </Steps>
  )
}
```

### 2. Vertical Layout

```tsx
function VerticalSteps() {
  return (
    <Steps orientation="vertical" size="sm">
      <Step title="Order Placed" description="Your order is confirmed" />
      <Step title="Processing" description="Preparing your items" />
      <Step title="Shipped" description="On the way to you" />
      <Step title="Delivered" description="Enjoy your purchase!" />
    </Steps>
  )
}
```

### 3. Custom Icons

```tsx
import { UserIcon, CreditCardIcon, CheckIcon } from "lucide-react"

function IconSteps() {
  return (
    <Steps>
      <Step
        title="Profile"
        icon={<UserIcon className="h-4 w-4" />}
      >
        <ProfileForm />
      </Step>
      
      <Step
        title="Payment"
        icon={<CreditCardIcon className="h-4 w-4" />}
      >
        <PaymentForm />
      </Step>
      
      <Step
        title="Complete"
        icon={<CheckIcon className="h-4 w-4" />}
      >
        <CompletionMessage />
      </Step>
    </Steps>
  )
}
```

### 4. With Custom Navigation

```tsx
function CustomNavSteps() {
  const [currentStep, setCurrentStep] = useState(0)
  
  return (
    <div>
      <Steps step={currentStep}>
        <Step title="Step 1">Content 1</Step>
        <Step title="Step 2">Content 2</Step>
        <Step title="Step 3">Content 3</Step>
      </Steps>
      
      <div className="flex justify-between mt-6">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === 2}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

### 5. Different Sizes

```tsx
function SizeVariations() {
  return (
    <div className="space-y-8">
      <Steps size="xs">
        <Step title="Small" />
        <Step title="Steps" />
      </Steps>
      
      <Steps size="lg">
        <Step title="Large" />
        <Step title="Steps" />
      </Steps>
    </div>
  )
}
```

## Styling Customization

The Steps component uses CSS variables and Tailwind classes that can be customized:

### Base Classes

You can override the default styling by passing custom classes:

```tsx
<Steps className="my-custom-steps">
  <Step 
    className="my-custom-step"
    title="Custom Styled"
  >
    Content
  </Step>
</Steps>
```

### State-based Styling

Steps automatically apply different styles based on their state:

- **Completed**: `bg-primary border-primary text-primary-foreground`
- **Current**: `bg-background border-primary text-primary ring-2 ring-primary/20`
- **Upcoming**: `bg-muted border-muted-foreground/30 text-muted-foreground`
- **Disabled**: `bg-muted border-muted-foreground/20 text-muted-foreground/50`

### Custom Color Schemes

You can create custom color variants by overriding the CSS classes:

```css
/* Custom blue theme */
.steps-blue .step-completed {
  @apply bg-blue-500 border-blue-500 text-white;
}

.steps-blue .step-current {
  @apply border-blue-500 text-blue-600 ring-blue-500/20;
}

/* Custom green theme */
.steps-green .step-completed {
  @apply bg-green-500 border-green-500 text-white;
}
```

## Accessibility

The Steps component includes comprehensive accessibility features:

- **ARIA Labels**: `role="navigation"`, `aria-label="Progress steps"`
- **Current Step**: `aria-current="step"` for the active step
- **Disabled States**: `aria-disabled` for non-interactive steps
- **Keyboard Navigation**: Full keyboard support with tab navigation
- **Screen Reader Support**: Proper announcements for state changes

## Advanced Usage

### Using the useSteps Hook

Access step context anywhere within the Steps component:

```tsx
import { useSteps } from "@/components/ui/steps"

function CustomStepContent() {
  const { currentStep, setCurrentStep, totalSteps } = useSteps()
  
  return (
    <div>
      <p>Step {currentStep + 1} of {totalSteps}</p>
      <button onClick={() => setCurrentStep(currentStep + 1)}>
        Next Step
      </button>
    </div>
  )
}
```

### Controlled vs Uncontrolled

```tsx
// Uncontrolled (manages own state)
<Steps defaultStep={1}>
  <Step title="Step 1" />
  <Step title="Step 2" />
</Steps>

// Controlled (you manage state)
<Steps
  step={currentStep}
  onStepChange={({ step }) => setCurrentStep(step)}
>
  <Step title="Step 1" />
  <Step title="Step 2" />
</Steps>
```

### Step Completion Tracking

```tsx
function TrackedSteps() {
  const [completedSteps, setCompletedSteps] = useState(new Set())
  
  const handleStepComplete = (step: number) => {
    setCompletedSteps(prev => new Set(prev).add(step))
  }
  
  return (
    <Steps onStepComplete={handleStepComplete}>
      <Step
        title="Step 1"
        isCompleted={completedSteps.has(0)}
      />
      <Step
        title="Step 2"
        isCompleted={completedSteps.has(1)}
      />
    </Steps>
  )
}
```

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
interface StepData {
  title: string
  description?: string
  isCompleted: boolean
}

function TypedSteps() {
  const [steps, setSteps] = useState<StepData[]>([
    { title: "Step 1", isCompleted: false },
    { title: "Step 2", isCompleted: false },
  ])
  
  return (
    <Steps>
      {steps.map((step, index) => (
        <Step
          key={index}
          title={step.title}
          description={step.description}
          isCompleted={step.isCompleted}
        />
      ))}
    </Steps>
  )
}
```

## Best Practices

1. **Step Titles**: Keep titles concise and descriptive
2. **Linear Flow**: Use `linear={true}` for processes that must be completed in order
3. **Completion Status**: Always manage `isCompleted` state for proper visual feedback
4. **Content**: Keep step content focused and avoid overwhelming users
5. **Navigation**: Provide clear navigation options (built-in or custom)
6. **Responsive**: Test on different screen sizes, especially for horizontal layouts
7. **Accessibility**: Always test with screen readers and keyboard navigation

## Troubleshooting

### Common Issues

1. **Steps not updating**: Ensure you're managing state correctly in controlled mode
2. **Linear mode not working**: Check that `isCompleted` is properly set for each step
3. **Styling issues**: Verify Tailwind CSS classes are available and not conflicting
4. **TypeScript errors**: Make sure all required props are provided

### Performance Considerations

- Use `React.memo` for step content if it's expensive to render
- Avoid creating new objects in render for stable references
- Consider lazy loading step content for large multi-step forms

## Contributing

When contributing to this component:

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update documentation for any changes
4. Ensure accessibility standards are maintained
5. Test with keyboard navigation and screen readers

## License

This component follows the same license as your project.
