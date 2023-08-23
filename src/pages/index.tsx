import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useColorMode,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function () {
  const toast = useToast()
  const [name, setName] = useState("")
  const [lines, setLines] = useState("")
  const { setColorMode } = useColorMode()
  useEffect(() => {
    setColorMode("dark")
  }, [])

  return (
    <Center height="100vh" bg="#222">
      <Flex
        as="form"
        flexDirection="column"
        width="22.5rem"
        onSubmit={(e) => {
          e.preventDefault()
          const regexp = /.+\n[0-9-+() ]+/gi
          const linhas = lines.match(regexp)
          let texto = ""
          if (!linhas) return
          for (const linha of linhas) {
            let [nome, numero] = linha.split("\n")

            numero = numero.replace(/[+()]/g, "")
            texto += `${nome}\t="${numero}"\t${name}\n`
          }

          navigator.clipboard.writeText(texto).then(
            () => {
              toast({
                title: `${linhas.length} contatos cópiados pra área de transferência`,
                position: "top-right",
                description: "Cole em sua planilha pressionando (Ctrl + v)",
                status: "success",
                duration: 10000,
                isClosable: true,
              })
            },
            () => {
              toast({
                title: "Erro",
                position: "top-right",
                description:
                  "verifique se os campos foram preenchidos corretamente e tente novamente",
                status: "error",
                duration: 10000,
                isClosable: true,
              })
            }
          )
        }}
      >
        <FormControl>
          <FormLabel fontWeight="semibold">Nome do referido</FormLabel>
          <Input
            textTransform="capitalize"
            size="lg"
            fontSize="1rem"
            onBlur={(e) => {
              let names = e.target.value.split(" ")
              let nameList = []
              for (const name of names) {
                const firtChar = name.charAt(0)
                const subString = name.substring(1)
                const nameCapitalized =
                  firtChar.toUpperCase() + subString.toLocaleLowerCase()
                nameList.push(nameCapitalized)
              }
              const fullNameCapitalized = nameList.join(" ")
              setName(fullNameCapitalized)
            }}
          />
        </FormControl>
        <FormControl marginTop="1.5rem">
          <FormLabel fontWeight="semibold">Contatos</FormLabel>
          <Textarea
            rows={6}
            onChange={(e) => {
              setLines(e.currentTarget.value)
            }}
          />
        </FormControl>
        <Text
          marginY="2.25rem"
          textAlign="center"
          color="blue.300"
          cursor="pointer"
          _hover={{
            textDecoration: "underline",
          }}
          onClick={() => {
            const input = document.getElementsByTagName("input")[0]
            const textarea = document.getElementsByTagName("textarea")[0]
            input.value = ""
            textarea.value = ""
          }}
        >
          Limpar formulários
        </Text>
        <Button
          type="submit"
          bg="blue.300"
          color="#222"
          size="lg"
          fontSize="1rem"
          _hover={{
            bg: "blue.200",
          }}
        >
          Cópiar
        </Button>
      </Flex>
    </Center>
  )
}
