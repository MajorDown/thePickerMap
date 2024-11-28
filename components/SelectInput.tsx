import { useState, useRef } from 'react';
import { View, Text, Pressable, FlatList, Animated, ViewStyle, TextStyle, Image } from 'react-native';

export type SelectOption = {
  label: string;
  value: string | number;
};

export type SelectContainerStyles = {
  borderWidth?: ViewStyle['borderWidth'];
  borderColor?: ViewStyle['borderColor'];
  borderRadius?: ViewStyle['borderRadius'];
};

export type SelectTextStyles = {
  fontSize?: TextStyle['fontSize'];
  fontColor?: TextStyle['color'];
};

export type SelectArrowStyles = {
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
}

export type SelectBtnStyles = {
  backgroundColor?: ViewStyle['backgroundColor'];
  borderColor?: ViewStyle['borderColor'];
  borderRadius?: ViewStyle['borderRadius'];
  borderWidth?: ViewStyle['borderWidth'];
  padding?: ViewStyle['padding']
};

export type OptionsListStyles = {
  maxHeight?: number;
  backgroundColor?: ViewStyle['backgroundColor'];
  borderRadius?: ViewStyle['borderRadius'];
  borderColor?: ViewStyle['borderColor'];
  borderWidth?: ViewStyle['borderWidth'];
  marginTop?: ViewStyle['marginTop'];
};

export type OptionStyles = {
  borderColor?: ViewStyle['borderColor'];
  borderWidth?: ViewStyle['borderWidth'];
  padding?: ViewStyle['padding'];
};

export type SelectInputProps = {
  options: SelectOption[];
  onSelect: (value: string | number) => void;
  defaultValue?: SelectOption;
  width?: number;
  selectTextStyles?: SelectTextStyles;
  selectArrowStyles?: SelectArrowStyles
  selectContainerStyles?: SelectContainerStyles;
  selectBtnStyles?: SelectBtnStyles;
  optionsListStyles?: OptionsListStyles;
  optionStyles?: OptionStyles;
  openingDuration?: number;
  closingDuration?: number;
};

/**
 * Composant de sélection d'entrée
 * @param {SelectOption[]} props.options - Liste des options
 * @param {(value: string | number) => void} props.onSelect - Fonction de rappel pour gérer la sélection
 * @param {SelectOption} [props.defaultValue] - Option par défaut
 * @param {number} [props.width] - Largeur du composant
 * @param {SelectTextStyles} [props.selectTextStyles] - Styles de texte pour le bouton de sélection
 * @param {SelectContainerStyles} [props.selectContainerStyles] - Styles de conteneur pour le composant
 * @param {SelectBtnStyles} [props.selectBtnStyles] - Styles de bouton pour le bouton de sélection
 * @param {OptionsListStyles} [props.optionsListStyles] - Styles de liste pour la liste déroulante
 * @param {OptionStyles} [props.optionStyles] - Styles d'option pour chaque élément de la liste
 * @param {number} [props.openingDuration] - Durée de l'animation d'ouverture
 * @param {number} [props.closingDuration] - Durée de l'animation de fermeture
 * @returns {JSX.Element}
 */
const SelectInput = (props: SelectInputProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(props.defaultValue?.value);

  const data = props.defaultValue && !props.options.some((opt) => opt.value === props.defaultValue?.value)
  ? [props.defaultValue, ...props.options]
  : props.options;

  // Ref pour l'animation de hauteur
  const animatedHeight = useRef(new Animated.Value(0)).current; // `Animated.Value` initialisé avec 0
  const maxHeight = props.optionsListStyles?.maxHeight || 200; // Assurez-vous que c'est bien un nombre

  const handleSelect = (item: string | number) => {
    setSelectedValue(item);
    props.onSelect(item);
    toggleDropdown(); // Ferme la liste après sélection
  };

  const toggleDropdown = () => {
    if (isOpen) {
      // Fermeture de la liste
      Animated.timing(animatedHeight, {
        toValue: 0, // Réduit la hauteur à 0 pour cacher la liste
        duration: props.closingDuration || props.openingDuration || 100, // Durée de l'animation (en millisecondes)
        useNativeDriver: false, // `false` car nous animons la hauteur
      }).start(() => setIsOpen(false));
    } else {
      // Ouverture de la liste
      setIsOpen(true);
      Animated.timing(animatedHeight, {
        toValue: maxHeight, // Augmente la hauteur jusqu'à maxHeight
        duration: props.openingDuration || 100, // Durée de l'animation
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View
      style={[
        {
          position: 'relative',
          width: props.width || undefined,
          borderWidth: props.selectContainerStyles?.borderWidth || 1,
          borderColor: props.selectContainerStyles?.borderColor || '#ccc',
          borderRadius: props.selectContainerStyles?.borderRadius || 0,
        },
      ]}
    >
      <Pressable
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: props.selectBtnStyles?.backgroundColor || '#fff',
            borderColor: props.selectBtnStyles?.borderColor || '#ccc',
            borderRadius: props.selectBtnStyles?.borderRadius || 0,
            borderWidth: props.selectBtnStyles?.borderWidth || 1,
            padding: props.selectBtnStyles?.padding || 5,
          },
        ]}
        onPress={toggleDropdown}
      >
        {props.options.length !== 0 && (
          <Text
            style={[
              {
                marginRight: 5,
                fontSize: props.selectTextStyles?.fontSize || 16,
                color: props.selectTextStyles?.fontColor || '#333',
              },
            ]}
          >
            {selectedValue || 'Choisissez une option'}
          </Text>
        )}
        {props.options.length === 0 && <Text>Aucune option disponible</Text>}
        {isOpen ? (
          <Image
            source={require('@/assets/images/arrow_up.png')}
            style={{
              width: props.selectArrowStyles?.width || 20,
              height: props.selectArrowStyles?.height || 10,
            }}
          />
        ) : (
          <Image
            source={require('@/assets/images/arrow_down.png')}
            style={{
              width: props.selectArrowStyles?.width || 20,
              height: props.selectArrowStyles?.height || 10,
            }}
          />
        )}
      </Pressable>
  
      {isOpen && (
        <Animated.View
          style={[
            {
              position: 'absolute', 
              top: 0,
              left: 0,
              right: 0,
              zIndex: 999,
              overflow: 'hidden',
              height: animatedHeight,
              backgroundColor: props.optionsListStyles?.backgroundColor || '#fff',
              borderRadius: props.optionsListStyles?.borderRadius || 0,
              borderColor: props.optionsListStyles?.borderColor || '#ccc',
              borderWidth: props.optionsListStyles?.borderWidth || 0,
              marginTop: props.optionsListStyles?.marginTop || 0,
            },
          ]}
        >
          <FlatList
            nestedScrollEnabled // Permet le défilement imbriqué
            keyboardShouldPersistTaps="handled" // Gère les événements de toucher
            data={data}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item.value)}
                style={[
                  {
                    borderColor: props.optionStyles?.borderColor || '#ccc',
                    borderWidth: props.optionStyles?.borderWidth || 1,
                    padding: props.optionStyles?.padding || 10,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: props.selectTextStyles?.fontSize || 16,
                      color: props.selectTextStyles?.fontColor || '#333',
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
  
};

export default SelectInput;