import { useFieldArray } from "react-hook-form";
import { SelectWithId } from "../../components/ReusableInputs";

export const VariationAttributes = ({
  control,
  register,
  watch,
  errors,
  attributes,
  vIndex,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variations.${vIndex}.attributes`,
  });

  return (
    <div className="space-y-4">
      <h5 className="font-medium text-gray-700">Attributes</h5>

      {fields.map((field, aIndex) => {
        const attributeIdPath = `variations.${vIndex}.attributes.${aIndex}.attribute_id`;
        const valueIdPath = `variations.${vIndex}.attributes.${aIndex}.attribute_value_id`;

        const selectedAttributeId = watch(attributeIdPath);

        const selectedAttribute = attributes.find(
          (a) => a.id === Number(selectedAttributeId),
        );

        const selectedAttributeIds = fields
          .map((f) => f.attribute_id)
          .filter(Boolean)
          .map(Number);

        return (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
          >
            {/* ATTRIBUTE */}
            <SelectWithId
              label="Attribute"
              name={attributeIdPath}
              options={attributes
                .filter(
                  (attr) =>
                    !selectedAttributeIds.includes(attr.id) ||
                    attr.id === Number(selectedAttributeId),
                )
                .map((attr) => ({
                  value: attr.id,
                  label: attr.name,
                }))}
              register={register}
              required
              errors={errors}
            />

            {/* ATTRIBUTE VALUE */}
            <SelectWithId
              label="Attribute Value"
              name={valueIdPath}
              options={
                selectedAttribute
                  ? selectedAttribute.values.map((v) => ({
                      value: v.id,
                      label: v.value ?? v.name,
                    }))
                  : []
              }
              register={register}
              required
              errors={errors}
              disabled={!selectedAttributeId}
            />

            {/* REMOVE */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(aIndex)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        );
      })}

      {/* ADD ATTRIBUTE */}
      <button
        type="button"
        onClick={() => append({ attribute_id: "", attribute_value_id: "" })}
        className="text-blue-600 text-sm font-medium"
      >
        + Add Attribute
      </button>
    </div>
  );
};
