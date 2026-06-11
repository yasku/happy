import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { ToolViewProps } from './_all';
import { ToolSectionView } from '../ToolSectionView';

export const TaskOutputView = React.memo<ToolViewProps>(function TaskOutputView({ tool }) {
    const input = tool.input as Record<string, unknown> | null | undefined;
    const result = tool.result as Record<string, unknown> | string | null | undefined;
    const output: string | null =
        typeof input?.output === 'string' ? input.output :
        typeof result === 'string' ? result :
        result && typeof (result as Record<string, unknown>).output === 'string'
            ? (result as Record<string, unknown>).output as string
            : null;

    if (!output) {
        return null;
    }

    return (
        <ToolSectionView>
            <View style={styles.container}>
                <Text style={styles.output} selectable>{output}</Text>
            </View>
        </ToolSectionView>
    );
});

const styles = StyleSheet.create((theme: { colors: { text: string } }) => ({
    container: {
        paddingHorizontal: 4,
    },
    output: {
        fontSize: 13,
        color: theme.colors.text,
        fontFamily: 'monospace' as const,
        lineHeight: 18,
    },
}));
