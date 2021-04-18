OUTPUT_DIRECTORY=./dist
PLANTUML_SERVER_CONTAINER_NAME=plantumlondemand

mkdir -p $OUTPUT_DIRECTORY


# // TODO: support any depth of readme, this will involve tweaking panrun
for inputFilePath in ./*.md; do
    echo "$inputFilePath"
    filename=$(basename $inputFilePath)
    extension="${inputFilePath##*.}"
    filePathNoExtension="${inputFilePath%.*}"
    filenameNoExtension="${filename%.*}"

    # md -> docx
    echo -e "\t$OUTPUT_DIRECTORY/$filenameNoExtension.docx"
    pandoc $inputFilePath -o "$OUTPUT_DIRECTORY/$filenameNoExtension.docx" --filter pandoc-plantuml
    # md -> pdf
    echo -e "\t$OUTPUT_DIRECTORY/$filenameNoExtension.pdf"
    pandoc $inputFilePath -o "$OUTPUT_DIRECTORY/$filenameNoExtension.pdf" --pdf-engine=xelatex --filter pandoc-plantuml
done


# // TODO: hex encoding dont seem to work.
# build plantuml
#docker run --name --rm $PLANTUML_SERVER_CONTAINER_NAME -d -p 9998:8080 plantuml/plantuml-server:jetty
# PLANTUML_PLAINTEXT_TEST="cat ./basic-plantuml.txt"
# HEX_ENCODING=$(xxd -pu <<< "$PLANTUML_PLAINTEXT_TEST")
# echo $HEX_ENCODING
#curl "http://localhost:9998/uml/~h$HEX_ENCODING"
#docker stop $PLANTUML_SERVER_CONTAINER_NAME