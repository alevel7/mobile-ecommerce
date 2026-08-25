
import { Baby, BriefcaseBusiness, Ellipsis, Grid2x2, Mars, SportShoe, Venus } from 'lucide-react-native'
import { CategoryItemIcon, CategoryItemProps } from '../constants/types'
import { TouchableOpacity, Text, View } from 'react-native'
import { COLORS } from '../constants'

const CategoryItem = (props: CategoryItemProps) => {
    return (
        <TouchableOpacity
            key={props.item.id}
            className="mr-4 items-center"
            onPress={props.onPress}>
            <View className={`w-14 h-14 rounded-lg items-center justify-center mb-2 ${props.isSelected ? 'bg-gray-200' : ''}`}>
                {generateIcon(props.item.icon, 24, props.isSelected)}
                <Text className={`text-primary font-bold ${props.isSelected ? 'text-primary' : 'text-secondary'}`}>{props.item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const generateIcon = (iconName: CategoryItemIcon, size: number, isSelected: boolean = false) => {
    switch (iconName) {
        case 'Mars':
            return <Mars size={size} color={isSelected ? '#FFF' : COLORS.primary} />;
        case 'Venus':
            return <Venus size={size} color={isSelected ? '#FFF' : COLORS.primary} />;
        case 'Baby':
            return <Baby size={size} color={isSelected ? '#FFF' : COLORS.primary} />;
        case 'SportShoe':
            return <SportShoe size={size} color={isSelected ? '#FFF' : COLORS.primary} />;
        case 'BriefcaseBusiness':
            return <BriefcaseBusiness size={size} color={isSelected ? '#FFF' : COLORS.primary} />;
        case 'grid':
            return <Grid2x2 size={size} color={isSelected ? '#FFF' : COLORS.primary} />;
        case 'other':
            return <Ellipsis size={size} color={isSelected ? '#FFF' : COLORS.primary} />;
        default:
            return null;
    }
}

export default CategoryItem
