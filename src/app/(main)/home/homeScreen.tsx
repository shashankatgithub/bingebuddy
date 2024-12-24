import React from "react";
import ImageCard from "@/src/components/pages/ImageCard";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  useAnimatedReaction,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { globalStyles, gradients } from "@/src/styles";
import ActionButtons from "@/src/components/organisms/ActionButtons";

const profiles = [
  {
    id: 1,
    image:
      "https://cdn.prod.website-files.com/6009ec8cda7f305645c9d91b/66a4263d01a185d5ea22eeec_6408f6e7b5811271dc883aa8_batman-min.png",
    name: "Batman",
    genre: ["Action", "Adventure"],
    year: 2022,
    description: "The Batman is an upcoming American superhero film based on the DC Comics character Batman.",
    rating: 7.7,
    duration: "2h 55m",
    watchOptions: ["Netflix", "Prime Video"]
  },
  {
    id: 2,
    image:
      "https://m.media-amazon.com/images/I/71uoicxpqoS.jpg",
      name: "Titanic",
      genre: ["Romance", "Drama"],
      year: 1997,
      description: "Titanic is a 1997 American epic romance and disaster film directed, written, co-produced, and co-edited by James Cameron.",
      rating: 7.8,
      duration: "3h 30m",
      watchOptions: ["Netflix", "Hotstar"]
  },
  {
    id: 3,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/jr3t5e80/poster/h/y/t/medium-black-panther-movie-poster-for-room-office-13-inch-x-19-original-imafcz4zqkfaxxcc.jpeg?q=90&crop=false",
      name: "Black Panther",
      genre: ["Action", "Adventure" ,"Sci-Fi", "Fantasy"],
      year: 2018,
      description: "Black Panther is a 2018 American superhero film based on the Marvel Comics character of the same name.",
      rating: 7.3,
      duration: "2h 15m",
      watchOptions: ["Netflix", "Prime Video"]
  },
  {
    id: 4,
    image:
      "https://m.media-amazon.com/images/I/71OHH9HaB5S.jpg",
      name: "TENET",
      genre: ["Action", "Sci-Fi", "Thriller"],
      year: 2020,
      description: "Tenet is a 2020 science fiction action-thriller film written and directed by Christopher Nolan.",
      rating: 7.4,
      duration: "2h 30m",
      watchOptions: ["Netflix", "Prime Video"]
  },
  {
    id: 5,
    image:
      "https://m.media-amazon.com/images/M/MV5BMTA0Njk2NTIyMTVeQTJeQWpwZ15BbWU3MDU0MzUyMzI@._V1_.jpg",
      name: "Ghost of Girlfriend's Past",
      genre: ["Comedy", "Fantasy", "Romance"],
      year: 2009,
      description: "Ghosts of Girlfriends Past is a 2009 American romantic comedy film directed by Mark Waters. The script was written by Jon Lucas and Scott Moore, based on Charles Dickens' 1843 novella A Christmas Carol.",
      rating: 5.8,
      duration: "1h 40m",
      watchOptions: ["Netflix", "Prime Video"]
  },
  {
    id: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-82VS5xVTPVPk988jLU--0wX6zGXiD1Dyg&shttps://images.justwatch.com/poster/75578773/s718/the-day-the-earth-stood-still.jpg",
      name: "The Day the Earth Stood Still",
      genre: ["Sci-Fi", "Drama"],
      year: 2008,
      description: "The Day the Earth Stood Still is a 2008 American science fiction thriller film.",
      rating: 5.5,
      duration: "1h 44m",
      watchOptions: ["Netflix", "Prime Video"]
  },
];

const HomeScreen = () => {
  const [users, setUsers] = useState(profiles);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    if (index > users.length - 3) {
      //TODO Here equate with last profile index and show some card that suggestion are over.
      console.warn("Last 2 cards remaining. Fetch more!");
      setUsers((profile) => [...profile, ...profiles.reverse()]);
    }
  }, [index]);

  return (
    <LinearGradient
      colors={gradients.appGradient.colors}
      start={gradients.appGradient.start}
      end={gradients.appGradient.end}
      style={globalStyles.gradientContainer}
    >
      <View className="flex-1 items-center justify-center">
        <Stack.Screen options={{ headerShown: false }} />
        {users.map((user, index) => (
          <ImageCard
            key={`${user.id}-${index}`}
            user={user}
            numOfCards={users.length}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
        <ActionButtons
          times={undefined}
          star={undefined}
          heart={undefined}
          style={globalStyles.actionButtonStyle}
        ></ActionButtons>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
