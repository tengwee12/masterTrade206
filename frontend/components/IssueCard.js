import { View, Text, Image } from 'react-native';

const IssueCard = ({ issue }) => {
    return (
        <View className='bg-white rounded-lg shadow-md m-2 p-4'>
            {issue.media ? (
                <Image
                    source={{ uri: issue.media }}
                    className='h-40 w-full rounded'
                    resizeMode="cover"
                />
            ) : null}
            <Text className='text-lg font-bold mt-2'>{issue.title}</Text>
            <Text className='text-gray-700'>{issue.category}</Text>
            <Text className='text-gray-500 mt-2'>{issue.description}</Text>
        </View>
    );
};

export default IssueCard;