/* Core Components */
export {
  Button,
  IconButton,
  type ButtonVariant,
  type ButtonSize,
  type ButtonProps,
  type IconButtonProps,
} from './button';
export { Input, type InputVariant, type InputSize, type InputProps } from './input';
export { Textarea, type TextareaVariant, type TextareaSize, type TextareaProps } from './textarea';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardVariant,
  type CardPadding,
  type CardProps,
} from './card';
export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
} from './sidebar';

/* Display */
export { Avatar, AvatarGroup } from './avatar';
export {
  Badge,
  Tag,
  Chip,
  type BadgeVariant,
  type BadgeSize,
  type BadgeProps,
  type TagProps,
  type ChipSize,
  type ChipProps,
} from './badge';
export { Tooltip, TooltipProvider } from './tooltip';

/* Form Controls */
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  type SelectVariant,
  type SelectSize,
} from './select';
export { Checkbox, type CheckboxSize, type CheckboxProps } from './checkbox';
export {
  RadioGroup,
  RadioGroupItem,
  type RadioSize,
  type RadioGroupProps,
  type RadioGroupItemProps,
} from './radio';
export { Toggle, Switch } from './toggle';
export { FormField, Fieldset, type FormFieldProps, type FieldsetProps } from './form-field';

/* Dropdown */
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
} from './dropdown';

/* Feedback */
export { Toaster, toast } from './toast';
export {
  Spinner,
  Skeleton,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonText,
  LoadingOverlay,
} from './loading';
export { ProgressBar, CircularProgress } from './progress';
export { Alert, type AlertVariant, type AlertSize, type AlertProps } from './alert';

/* Overlay */
export {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  AlertDialog,
  type ModalSize,
  type ModalContentProps,
  type AlertDialogVariant,
  type AlertDialogProps,
} from './modal';
export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  type DrawerSide,
  type DrawerSize,
  type DrawerContentProps,
} from './drawer';
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose } from './popover';

/* Navigation */
export { Pagination } from './pagination';
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsVariant,
  type TabsSize,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
} from './tabs';
export {
  SegmentedControl,
  type SegmentedControlSize,
  type SegmentedControlOption,
  type SegmentedControlProps,
} from './segmented-control';

/* Data Display */
export { DataTable, type ColumnDef } from './table';
export { Calendar, DatePicker, DateRangePicker } from './calendar';

/* Icons - Navigation */
export { HomeIcon, MenuIcon, SearchIcon, SettingsIcon } from './icons';

/* Icons - Actions */
export { PlusIcon, EditIcon, TrashIcon, CloseIcon, CheckIcon } from './icons';

/* Icons - Arrows */
export {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from './icons';

/* Icons - User */
export { UserIcon, UsersIcon } from './icons';

/* Icons - General */
export { CalendarIcon, ClockIcon, BellIcon, HeadphonesIcon } from './icons';

/* Icons - Status */
export { AlertCircleIcon, CheckCircleIcon, InfoIcon } from './icons';

/* Icons - Misc */
export {
  MoreHorizontalIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
} from './icons';

/* Icons - Music Playback */
export {
  PlayIcon,
  PauseIcon,
  StopIcon,
  SkipBackIcon,
  SkipForwardIcon,
  LoopIcon,
  RepeatIcon,
  ShuffleIcon,
} from './icons';

/* Icons - Music Notes & Symbols */
export {
  MusicIcon,
  MusicNoteIcon,
  MusicNotesIcon,
  SheetMusicIcon,
  TrebleClefIcon,
  BassClefIcon,
  ChordIcon,
} from './icons';

/* Icons - Music Practice */
export { MetronomeIcon, PracticeIcon, TempoIcon } from './icons';

/* Icons - Instruments */
export { MicIcon, GuitarIcon, BassIcon, DrumIcon, KeyboardIcon, PianoIcon } from './icons';

/* Icons - Ensemble */
export { EnsembleIcon, MixerIcon, BandIcon, VolumeIcon, VolumeMuteIcon } from './icons';

/* Icons - Recording */
export { RecordIcon, WaveformIcon } from './icons';

/* Icon System (Registry-based) */
export {
  Icon,
  type IconComponentProps,
  type IconName,
  type IconSize,
  type IconTone,
} from './icons/index';
