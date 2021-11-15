import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useAppContext } from '../App.provider';
import { theme } from '../theme';

export const Analytics: React.FC = () => {
  const appContext = useAppContext();

  // THIS WAS REPLACED BY NATIVE FUNCTION!
  /*  const data = Object.entries(groupBy(appContext.moodList, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    }),
  ); */

  const data = Object.entries(
    appContext.moodList.reduce(
      // eslint-disable-next-line no-sequences
      (r, v, i, a, k = v.mood.emoji) => ((r[k] || (r[k] = [])).push(v), r),
      {},
    ),
  ).map(([key, value]) => ({
    x: key,
    y: value.length,
  }));

  return (
    <View style={styles.container}>
      <VictoryPie
        labelRadius={80}
        radius={150}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorWhite,
        ]}
        style={{ labels: { fontSize: 30 } }}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
