import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { ToolViewProps } from './_all';
import { ToolSectionView } from '../ToolSectionView';

export const TaskStopView = React.memo<ToolViewProps>(function TaskStopView({ tool }) {
    const input = tool.input as Record<string, unknown> | null | undefined;
    const rawResult = tool.result as string | null | undefined;
    const result: string | null =
        typeof input?.result === 'string' ? input.result :
        typeof input?.reason === 'string' ? input.reason :
        typeof rawResult === 'string' ? rawResult :
        null;

    if (!result) {
        return null;
    }

    return (
        <ToolSectionView>
            <View style={styles.container}>
                <Text style={styles.result} selectable>{result}</Text>
            </View>
        </ToolSectionView>
    );
});

const styles = StyleSheet.create((theme: { colors: { textSecondary: string } }) => ({
    container: {
        paddingHorizontal: 4,
    },
    result: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        lineHeight: 18,
    },
}));
